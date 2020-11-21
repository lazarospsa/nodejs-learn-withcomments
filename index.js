//kanw eisagwgh ta paketa pou 9elw na xrhsimopoihsw
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
//eisagagw to diko mou module
const logger = require('./middleware/logger')
//orizw to app oti einai ena instance tou express
const app = express()
//9etw sto app (sto express dld) na xrhsimopoiei ton fakelo public
//gia na servirei static files
app.use(express.static(path.join(__dirname, 'public')))
const port = process.env.port || 3000

//eisagw auta ta duo middlewares gia na mporw na pairnw post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware - trexei se ka9e request prwtou ektelestei to response
app.use(logger)
//^^^^ ean apenergopoih9ei auto to module kerdizw shmantiko pleonektima sto posa requests shkwnei h efarmogh
//363 req/s me ton logger
//805 req/s xwris ton logger
//to test egine me autocannon
//npm i -g autocannon
//autocannon -c 100 -d 1 -p 10 http://localhost:3000/api/students/1

//routes for web
app.use('/',require('./routes/web'))
//routes for api
app.use('/api/students/',require('./routes/api/students'))
//routes for mongo api
app.use('/mongo/',require('./routes/api/mongo'))
//start server
app.listen(port, () => console.log(`Server running on port: ${port}`))

//start db -> cd db && mongod --dbpath=. ----- OXI AUTO
//brew services start mongodb-community ---- <<<< ME AUTO
//ean vgazei 9ema trexw
//$ sudo rm -rf /tmp/mongodb-27017.sock
//$ sudo brew services restart mongod


//post request -> http://localhost:3000/trymongo
//{
// "name":"Xristina",
// "age":"25"
// }

//get request -> http://localhost:3000/trymongo/
//returns all data

//get request -> http://localhost:3000/trymongo/Lazaros
//return only the row that name is Lazaros