'use strict'

const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const UserSchema = Schema({
  name:String,
  lastName:String,
  nickName:String,
  email:String,
  age: {type:Number,default : 0}
})


var User = mongoose.model('User',UserSchema)
module.exports.User = User;
