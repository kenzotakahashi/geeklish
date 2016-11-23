const express = require('express')
const fs = require('fs')

const app = express()

app.set('port', (process.env.API_PORT || 3001))

app.get('/api/', (req, res) => {
	response.end("Welcome to my homepage!")
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) 
})