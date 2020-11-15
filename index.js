//kanw eisagwgh ta paketa pou 9elw na xrhsimopoihsw
const express = require('express')
const bodyParser = require('body-parser');
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

//---------------insert mongoose to project--------------
let MongoClient = require('mongodb').MongoClient;
const url = process.env.db_host;
//---------------insert mongoose to project--------------


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

//post a new row to mongo db
app.post('/trymongo', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true
        var dbo = db.db(process.env.db_name);
        dbo.collection("customers").insertOne({
            name: req.body.name,
            age: req.body.age
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

//gets all mongo db results that have name (like parametres)
app.get('/trymongo/name/:name', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true
        var dbo = db.db(process.env.db_name);
        dbo.collection("customers").find({
            name: req.params.name
        }).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
                // res.send(JSON.stringify(result));
            }
        })
    });
});

//gets all mongo db results that have that age (from params)
app.get('/trymongo/:age', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true
        var dbo = db.db(process.env.db_name);
        dbo.collection("customers").findOne({
            age: req.params.age
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

//gets all mongo db results
app.get('/trymongo', (req, res) => {
    // mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    MongoClient.connect(url, async function(err, db) {
    if (err) throw err;
    useNewUrlParser: true
    useUnifiedTopology: true
    useCreateIndex: true

    var dbo = db.db(process.env.db_name);
    var coll = dbo.collection('customers');

    coll.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
            // res.send(JSON.stringify(result));
        }
    })
    })
})

//routes for web
app.use('/',require('./routes/web'))
//routes for api
app.use('/api/students/',require('./routes/api/students'))
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