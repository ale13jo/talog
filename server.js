const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

var db

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  if (err) return console.log(err)
  db = client.db('talog') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));

/*app.listen(3000, function() {
  console.log('listening on 3000')
});*/
app.get('/', function(req, res) {
  var cursor = db.collection('somebase').find('{"features.geometry" : { $nearSphere : { $geometry : { type: "Point", "coordinates": [-77.02175930513762,38.88696128585864]}, $maxDistance: 100}}}').toArray(function(err, results) {
    console.log(results)
    // send HTML file populated with quotes here
  })
  res.sendFile(__dirname + '/index.html')
});

app.post('/talent', (req, res) => {
  db.collection('jobPost').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
