const functions = require('./functions')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/getRandomComments', function(req, res) {

    functions.getRandomVideos(req.body.channelId)
        .then(functions.readVideos)
        .then(functions.getListRandomComment)
        .then(respuesta => {
            res.status(200)
            res.send(JSON.stringify(respuesta))
        })
        .catch(error => {
            console.log(error)
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
            res.send(JSON.stringify(error))
        })
})
app.listen(process.env.PORT || 3000)
