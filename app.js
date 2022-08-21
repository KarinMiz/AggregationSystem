const dotenv = require('dotenv').config()
const http = require('http');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true, limit:'1mb'}))
app.use(bodyParser.json())


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error=>{console.error(error)})
db.once('open', ()=>{console.log('db connected')})

const port = process.env.PORT

const indexRouter = require('./routes/app_routes')
app.use('/', indexRouter)

app.listen(port,'127.0.0.1', ()=>{
    console.log('server is running on port '+ port)
})