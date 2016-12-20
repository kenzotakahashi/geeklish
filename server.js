import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import mongo from 'mongodb'
import async from 'async'

import { Dictionary } from './server/models/dictionary'
import { Element, Pos } from './server/models/element'
import { Project } from './server/models/project'

import { excludeId, categories } from './server/utils'

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

app.use(bodyParser.json())

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

app.get('/api/projects', (req, res) => {	
	Project.find({}).select('_id title category').exec((err, dic) => {
		if (err) {return next(err)}
		// TODO refactor using mongo instead of filter.
		const r = categories.map(o => ({
			category: o,
			examples: dic.filter(t => t.category === o)
		}))
		res.json({ result: r })
	})
})

app.get('/api/project/:_id', (req, res) => {	
	Element.find({'projectId': req.params._id}).exec((err, dic) => {
		if (err) {return next(err)}
		res.json({ result: dic })
	})
})

app.post('/api/save_project', (req, res) => {
	const project = req.body.project
	Project.findByIdAndUpdate(
		project._id,
		excludeId(project),
	  {upsert: true, setDefaultsOnInsert: true}
	).exec((err, dic) => {
	  if (err) return console.log(err)

		async.eachSeries(req.body.words, (element, callback) => {
			Pos[element.pos].findByIdAndUpdate(
				element._id,
				{...excludeId(element), projectId: project._id},
			  {upsert: true, setDefaultsOnInsert: true},
			  callback
			), function(err) {
			  if (err) return console.log(err);
			  res.json({ result: 'success' })
			}
		})
	})
})

app.get('*', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Find the server on ${app.get('port')}/`)
})