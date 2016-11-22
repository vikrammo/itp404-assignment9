var dotenv = require('dotenv');
dotenv.config();

var express = require('express')
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors'); // Cross Origin Resource Sharing
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var Yelp = require('yelp');
var yelp = require('./api/yelp');

var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

var Song = sequelize.define('song', {
  title: {
    type: Sequelize.STRING
  },
  playCount: {
    type: Sequelize.INTEGER,
    field: 'play_count'
  }
}, {
  timestamps: false
});

app.use(cors());
app.use(bodyParser());
// app.use(function(request, response, next) {
//   response.header('Access-Control-Allow-Origin', '*');
//   next();
// });



app.get('/yelp', function (request, response) {

  var yelp = new Yelp({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    token: process.env.token,
    token_secret: process.env.token_secret,
  });

  yelp.search({ term: 'food', location: 'Montreal' })
  .then(function (data) {
  response.json(data);
  })
  .catch(function (err) {
    response.json(err);
  });

})


app.get('/api/songs', function (request, response) {
  var promise = Song.findAll();
  promise.then(function(songs) {
    response.json({
      data: songs
    });
  });
})

app.listen(3000)
