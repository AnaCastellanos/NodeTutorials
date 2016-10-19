const functions = require('./functions')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/getRandomComments', function(req, res) {
  console.log(req.body.channelId)
    functions.getRandomVideos(req.body.channelId)
        .then(responses => {
            functions.readVideos(responses)
                .then(resp =>
                    functions.getlistRandomComment(resp)
                    .then(respuesta => {
                      res.status(200)
                      res.send(JSON.parse(JSON.stringify(respuesta)))
                    }))
        })
        .catch(error => {
            console.log(error);
            res.status(500)
        })
        .catch(error => {
            console.log(error);
            res.status(500)
        })
})
app.listen(3000)
