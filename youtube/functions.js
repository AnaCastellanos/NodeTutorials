const utils = require('./utils')
const Client = require('node-rest-client').Client
var client = new Client()
const config_json = require('./Config/config')


getRandomVideos = (channelId) =>{
    return new Promise(function(resolve,reject){
      client.get(config_json.host+"search?part=id%2Csnippet&channelId="+channelId+"&maxResults=50&order=viewCount&key="+config_json.key, function(data, response) {
      //  console.log(host+endpointVideos)
              return resolve(data)//if the response is correct
      }).on('error', function (err) {
        console.log('something went wrong on the request', err.request.options);
        reject('something went wrong on the request', err.request.options)
      })
  })
}

readVideos = (responses) => {
  var list = []

return new Promise(function(resolve,reject){
  //get all VideoId
let  responseVideos = JSON.parse(JSON.stringify(responses))
let arrayVideos = JSON.parse(JSON.stringify(responseVideos.items)) //get all items
let videosRandom = []
  arrayVideos.forEach(function(entry) {//foreach the this array
    var video = JSON.parse(JSON.stringify(entry))
      if(video.id.videoId  != undefined)
          list.push(video.id.videoId)
      })
      let numberVideos =  utils.random(0, list.length)
        for (var i = 0; i < numberVideos; i++) {
                videosRandom.push(list[utils.random(0, list.length)])
        }
        return resolve(videosRandom)
})
}


getlistRandomComment = (resp) => {
  var commentsAll = []
  return new Promise(function(resolve,reject){
    for (var i = 0; i < resp.length; i++) {
      client.get("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId="+resp[i]+"&fields=items%2Ckind&key=AIzaSyD-RgQmHd-5UzLKbBpMNwfDLSZSS0STtMc", function(data, response) {
        let responseVideos = JSON.parse(JSON.stringify(data))
        let arrayVideos = JSON.parse(JSON.stringify(responseVideos.items))
        arrayVideos.forEach(function(entry) {
        let video = JSON.parse(JSON.stringify(entry))
        //if(video.topLevelComment  != undefined)
          commentsAll.push(entry.snippet.topLevelComment.snippet.textDisplay)
        })
        return resolve(commentsAll)
      }).on('error', function (err) {
        console.log('error:', err.request.options);
        reject('error:', err.request.options)
      })
    }
  })
}


module.exports.getRandomVideos = getRandomVideos
module.exports.readVideos = readVideos
module.exports.getlistRandomComment = getlistRandomComment
