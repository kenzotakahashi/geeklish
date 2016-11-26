import express from 'express'
import mongoose from 'mongoose'
import { Dictionary, PronounDic } from './models/models'

const app = express()

mongoose.connect('mongodb://localhost/test')
mongoose.Promise = global.Promise

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function() {
//   const kittySchema = mongoose.Schema({
//       name: String
//   })
//   kittySchema.methods.speak = function () {
//     const greeting = this.name ? "Meow name is " + this.name : "I don't have a name"
//     console.log(greeting)
//   }
//   const Kitten = mongoose.model('Kitten', kittySchema)
//   const fluffy = new Kitten({ name: 'fluffy' })
//   fluffy.speak()
//   fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err)
//     fluffy.speak()
//   })
//   Kitten.find(function (err, kittens) {
//     if (err) return console.error(err)
//     console.log(kittens)
//   })
// })


app.set('port', (process.env.API_PORT || 3001))

app.get('/api/', (req, res) => {
	response.end("Welcome to my homepage!")
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) 
})