const express   = require('express')
const bodyParser= require('body-parser')
const mongoose  = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const User = require('./models/user').User

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post('/registerUsers',(req,res) => {

  let user = new User()
  user.name = req.body.name
  user.lastName = req.body.lastName
  user.nickName = req.body.nickName
  user.email = req.body.email
  user.age = req.body.age

  user.save((err,usStored)=>{
    if(err) res.status(500).send({message:'Error al salvar el usuario'+err})
    console.log({user: usStored})
    res.status(200).send({user: usStored})
  })
})


app.get('/listUsers',(req,res) => {
  User.find({}, function (err,user){
    if(err)     return res.status(200).send({message:'Error al realizar la peticion, error: '+err})
    if(!user)   return  res.status(200).send({message: 'El usuario no existe'})
    res.status(200).send(JSON.stringify(user));
   })
})


app.post('/findUsers',(req,res) => {
  let name = req.body.name
  User.find({name: name}, (err,user)=>{
    if(err)     return res.status(200).send({message:'Error al realizar la peticion, error: '+err})
      res.status(200).send(JSON.stringify(user));
   })
})


mongoose.connect('mongodb://hackro:hackro@ds033106.mlab.com:33106/david_hackro',function(err,db){
  if(err) return console.log(err)
  app.listen(port,()=>{
      console.log('listen in the port '+port)
  })

})
