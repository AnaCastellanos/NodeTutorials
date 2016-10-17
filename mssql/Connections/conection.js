const config_json = require('../Config/config')

var config ={
  server : config_json.host,
  database:config_json.database,
  user: config_json.user,
  password: config_json.password,
  port: config_json.port,
  requestTimeOut: config_json.requestTimeOut,
  conectionTimeOut: config_json.conectionTimeOut,
  user_service:"tutoriales",
  password_service:"hackro",
    option: {
      encrypt: config_json.encrypt
    }
}

module.exports = config
