const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Project = mongoose.model('Project', new Schema({
  _id: String,
  title: String,
  userId: String,
  category: String,
  reference: String,
  createdAt: {type: Date, default: Date.now},
}, {_id: false}))