const express = require('express')

const dbUrl = 'mongodb+srv://admin:KJsim29sjakjm437A@cluster0.mxtti.mongodb.net'
const dbName = 'exercicio-mongodb-intro-e-implementacao'

const app = express()


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)