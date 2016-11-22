var Yelp = require('yelp');

var client = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.access_token_key,
  token_secret: process.env.access_token_secret
});

module.exports = {
  search: function(term, location) {
    yelp.search({ term: 'food', location: 'Montreal' })
    .then(function (data) {
    response.json(data);
    })
    .catch(function (err) {
      response.json(err);
    });
  }
};
