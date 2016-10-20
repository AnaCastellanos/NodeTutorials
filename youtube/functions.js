const utils = require('./utils')
const Client = require('node-rest-client').Client
const config_json = require('./Config/config')
var client = new Client()


getRandomVideos = (channelId) => {
    return new Promise(function(resolve, reject) {
        client.get(`${config_json.host}search?part=id%2Csnippet&channelId=${channelId}&maxResults=50&order=viewCount&key=${config_json.key}`, function(data, response) {
            if (data.error)
                return reject(data.error)
            return resolve(data)
        }).on('error', function(err) {
            reject(err)
        })
    })
}

readVideos = (responses) => {
    let list = []
    let videosRandom = []
    return new Promise(function(resolve, reject) {
        responses.items.forEach(function(entry) {
            if (entry.id.videoId != undefined)
                list.push(entry.id.videoId)
        })
        for (var i = 0; i < utils.random(0, list.length); i++) {
            videosRandom.push(list[utils.random(0, list.length)])
        }
        return resolve(videosRandom)
    })
}

getListRandomComment = (resp) => {
    var commentsAll = []
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < resp.length; i++) {
            client.get(`${config_json.host}commentThreads?part=snippet&videoId=${resp[i]}&fields=items%2Ckind&key=${config_json.key}`, function(data, response) {
                if (data.error)
                    return reject(data.error)
                data.items.forEach(function(entry) {
                    commentsAll.push(JSON.parse(JSON.stringify(entry.snippet.topLevelComment.snippet.textDisplay)))
                })
                return resolve(commentsAll)
            }).on('error', function(err) {
                reject(err)
            })
        }
    })
}

module.exports = {
    getRandomVideos,
    readVideos,
    getListRandomComment
}
