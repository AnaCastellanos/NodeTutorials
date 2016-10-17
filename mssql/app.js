//This line is necesary in production using pm2  --- #!/usr/bin/env --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./Connections/conection')
const app = express()
var auth = require('basic-auth')
var sql = require('mssql')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.post('/nodeTutorials',function(req,res){
  var credentials = auth(req)

  if(!credentials || credentials.name !== config.user_service || credentials.pass !== config.password_service){
        handlerError(res,'auth fail','auth fail',200)
  }else{
      var query =	"select * from your_table"
      var conn = new sql.Connection(config)
      conn.connect().then(function(){
        var req = new sql.Request(conn)
        req.query(query).then(function(recordset){
          console.log('Tutoriales-Hackro')
          res.status(200)
          res.end(JSON.stringify(recordset))
          conn.close()
        })
        .catch(function (err){
          handlerError(res,err,err,200)
          conn.close()
        })
      }).catch(function (err){
        handlerError(res,err,err,200)
      })
  }

})




function handlerError(res,reason,message,code){
    res.status(code)
    console.log(message)
    res.end(`{"status": ${reason},"message":${message}}`)
}

app.listen(3000)
