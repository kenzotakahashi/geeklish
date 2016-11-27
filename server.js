import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import mongo from 'mongodb'
import { Dictionary, PronounDic, NounDic, DeterminerDic, VerbDic, AdjectiveDic,
         AdverbDic, ConjunctionDic, PrepositionDic, InfinitiveDic, BeDic, ClauseDic, NounContainerDic,
         NounClauseDic, AdjectiveClauseDic, ClauseContainerDic, VerbContainerDic } from './models/models'

const app = express()

const buildPath = path.resolve(__dirname, 'client/build')
app.use(express.static(buildPath))

mongoose.connect('mongodb://localhost/geeklish')
mongoose.Promise = global.Promise

app.set('port', (process.env.API_PORT || 3001))

app.get('/api/dictionary', (req, res) => {
	Dictionary.find({}).sort({'order': 1}).exec((err, dics) => {
	// Dictionary.find({}).select('_id base pos').exec((err, dics) => {
		if (err) {return next(err)}
		res.json({ result: dics })
	})
})

app.get('/api/dictionary/:id', (req, res) => {	
	Dictionary.findById(req.params.id).exec((err, dic) => {
		if (err) {return next(err)}
		res.json({ result: dic })
	})
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) 
})