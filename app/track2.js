var Twitter = require('node-twitter');
var credentials = require('./credentials.js');

var twitterStreamClient = new Twitter.StreamClient(
    CONSUMER_KEY = credentials.consumer_key,
    CONSUMER_SECRET = credentials.consumer_secret,
    TOKEN = credentials.access_token_key,
    TOKEN_SECRET = credentials.access_token_secret
);

twitterStreamClient.on('close', function() {
    console.log('Connection closed.');
});
twitterStreamClient.on('end', function() {
    console.log('End of Line.');
});
twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
});
twitterStreamClient.on('tweet', function(tweet) {
    console.log(tweet.text);
});

twitterStreamClient.start(['cake']);

//"401 unauthorized" when I tried the emoticons