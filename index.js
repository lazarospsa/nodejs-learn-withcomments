//kanw eisagwgh ta paketa pou 9elw na xrhsimopoihsw
const express = require('express')
const path = require('path')
//eisagagw to diko mou module
const logger = require('./middleware/logger')
//orizw to app oti einai ena instance tou express
const app = express()
//9etw sto app (sto express dld) na xrhsimopoiei ton fakelo public
//gia na servirei static files
app.use(express.static(path.join(__dirname, 'public')))
const port = process.env.port || 3000


//middleware - trexei se ka9e request prwtou ektelestei to response
// app.use(logger)
//^^^^ ean apenergopoih9ei auto to module kerdizw shmantiko pleonektima sto posa requests sukwnei h efarmogh
//363 req/s me ton logger
//805 req/s xwris ton logger
//to test egine me autocannon
//npm i -g autocannon
//autocannon -c 100 -d 1 -p 10 http://localhost:3000/api/students/1

//routes for web
app.use('/',require('./routes/web'))
//routes for api
app.use('/api/students/',require('./routes/api/students'))
//start server
app.listen(port, () => console.log(`Server running on port: ${port}`))