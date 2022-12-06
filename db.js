var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost/workshop', {useNewUrlParser: true, useUnifiedTopology: true })
.then(conn => global.conn = conn.db("workshop"))
.catch(err => console.log(err))

function insert(customer, callback){
    global.conn.collection('cliente').insertOne(customer, callback);
}

function findAll(callback){
    global.conn.collection('cliente').find({}).toArray(callback);
}

var ObjectId = require("mongodb").ObjectId;

function deleteOne(id, callback){
    global.conn.collection('cliente').deleteOne({_id: new ObjectId(id)}, callback)
}

function findOne(id, callback){
    global.collection('cliente').find(new ObjectId(id)).toArray(callback);
}


module.exports = { findAll, insert, deleteOne, findOne}