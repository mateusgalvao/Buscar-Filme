var express = require('express');
var router = express.Router();

function Simplify(text){
  const regex = /[\s,\.;:\(\)\-']/;
  return text.toUpperCase().split(regex);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.query.q)
  return res.render('index', { title: 'Motor de busca', movies:[], query: ''});
  else {
    const query = Simplify(req.query.q);
    const mongoClient = require('mongodb').MongoClient;
    mongoClient.connect('mongodb://localhost:27017/')
    .then(conn => conn.db("mydb"))
    .then(db => db.collection('movies2').find({tags:{$all:query}}))
    .then(cursor => cursor.toArray())
    .then(movies  => {
      return res.render('index', {title:'Motor de busca', movies, query:req.query.q})
    })
  }
});router.get('/tt', function(req, res, next) {
  if(!req.query.q)
  return res.render('index', { title: 'Motor de busca', clientes:[], query: ''});
  else {
    const query = Simplify(req.query.q);
    const mongoClient = require('mongodb').MongoClient;
    mongoClient.connect('mongodb://localhost:27017/')
    .then(conn => conn.db("mydb"))
    .then(db => db.collection('clientes').find({nome:{$all:query}}))
    .then(cursor => cursor.toArray())
    .then(movies  => {
      return res.render('index', {title:'Motor de busca', clientes , query:req.query.q})
    })
  }
})

module.exports = router;
