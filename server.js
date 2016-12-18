import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import mongo from 'mongodb'
import { Dictionary } from './models/dictionary'

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const app = express()

const buildPath = path.resolve(__dirname, 'client/build')
app.use(express.static(buildPath))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.set('port', (process.env.PORT || 3001))

app.get('/api/dictionary', (req, res) => {
	Dictionary.find({}).sort({'order': 1}).exec((err, dics) => {
	// Dictionary.find({}).select('_id base pos').exec((err, dics) => {
		if (err) {return next(err)}
		res.json({ result: dics })
	})
})

app.get('/api/dictionary/:id', (req, res) => {	
	Dictionary.findById(req.params._id).exec((err, dic) => {
		if (err) {return next(err)}
		res.json({ result: dic })
	})
})

app.get('*', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Find the server on ${app.get('port')}/`)
})