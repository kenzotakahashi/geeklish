import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import mongo from 'mongodb'
import Promise from 'promise'

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
	Dictionary.find({}).sort({'order': 1}).then((dics) => {
		res.json({ result: dics })
	})
})

app.get('/api/dictionary/:id', (req, res) => {	
	Dictionary.findById(req.params._id).then((dic) => {
		res.json({ result: dic })
	})
})

app.get('/api/projects', (req, res) => {
	Promise.all(categories.map(o => {
		return Project.find({category: o}).select('_id title').then((dic) => {
			return {
				category: o,
				examples: dic
			}
		})
	})).then((dic) => {
		res.json({ result: dic })
	})
})

app.get('/api/project/:_id', (req, res) => {	
	Element.find({'projectId': req.params._id}).then((dic) => {
		res.json({ result: dic })
	})
})

app.post('/api/save_project', (req, res) => {
	const project = req.body.project
	Project.findByIdAndUpdate(
		project._id,
		excludeId(project),
	  {upsert: true, setDefaultsOnInsert: true, new: true}
	).then(dic => {
		dic.save()
	}).then(_ => {
		return Promise.all(req.body.words.map(element => {
			return Pos[element.pos].findByIdAndUpdate(
				element._id,
				{...excludeId(element), projectId: project._id},
			  {upsert: true, setDefaultsOnInsert: true, new: true},
			).then(dic => {
				dic.save()
			})
		}))
	}).then(_ => {
		res.json({ result: 'success' })		
	})
})

app.get('*', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Find the server on ${app.get('port')}/`)
})