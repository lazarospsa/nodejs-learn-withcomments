const express = require('express')
const bodyParser = require('body-parser')
const mongo = express.Router()
require('dotenv').config()
//---------------insert mongoose to project--------------
let MongoClient = require('mongodb').MongoClient;
const url = process.env.db_host;
//---------------insert mongoose to project--------------

mongo.use(bodyParser.json());
mongo.use(bodyParser.urlencoded({ extended: true }));

//post a new row to mongo db
mongo.post('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true
        var dbo = db.db(process.env.db_name);
        dbo.collection("customers").insertOne({
            name: req.body.name,
            age: req.body.age
        }, 
        function(err, result) {
            if (err) throw err
            res.json(result)
            db.close()
        });
    });
});

//gets all mongo db results that have name (like parametres)
mongo.get('/name/:name', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true
        var dbo = db.db(process.env.db_name);
        dbo.collection("customers").find({
            name: req.params.name
        }).toArray(function (err, result) {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
                // res.send(JSON.stringify(result));
            }
        })
    });
});

//gets all mongo db results that have that age (from params)
mongo.get('/:age', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true
        var dbo = db.db(process.env.db_name)
        dbo.collection("customers").find({
            age: req.params.age
        }).toArray(function (err, result) {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
                // res.send(JSON.stringify(result));
            }
        })
    });
});

//gets all mongo db results
mongo.get('/', (req, res) => {
    // mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    MongoClient.connect(url, async function(err, db) {
    if (err) throw err;
    useNewUrlParser: true
    useUnifiedTopology: true
    useCreateIndex: true

    var dbo = db.db(process.env.db_name)
    var coll = dbo.collection('customers')

    coll.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.json(result)
            // res.send(JSON.stringify(result));
        }
    })
    })
})

module.exports = mongo 