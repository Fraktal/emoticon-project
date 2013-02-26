/*
   Twitter API ('statuses/filter', { "track":["cake"], "lang":"en" } working, however, we are still
   trying to figure out how to track emoticons via the track
*/

var twitter = require('immortal-ntwitter')
var express = require('express');
var credentials = require('./credentials.js');
var mongodb = require('mongodb'),
mongoclient = require('mongodb').Client;
var app = express();

var twit = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});
 
app.listen(3000);

var collection; //mongo database collection
var server = new mongodb.Server("127.0.0.1", 27017, {});

new mongodb.Db('tweets', server, {w:1}).open(function (err, client) {
  if (err)
      console.log(err);
  else
      collection = new mongodb.Collection(client, 'tweets');
      console.log('mongodb is connected!');
});


twit.immortalStream('statuses/filter', { "track":[":)"], "lang":"en" }, function(immortalStream) {
      immortalStream.on('data', function(tweet){
         var d = (tweet.created_at);
         var month = new Date(Date.parse(d)).getMonth()+1;
         var day = new Date(Date.parse(d)).getDate();
         var year = new Date(Date.parse(d)).getFullYear();
         var date = (year + "-" + month + "-" + day);
         console.log(date + " " + tweet.text)
         
         
         collection.insert({date: date, tweet: tweet.text}, {safe:true}, function(err, objects) {
            if (err) 
                console.log(err);
            else 
                console.log("tweet has been saved");                  
         });        
     
    });// end of tweet function

});// end of stream

