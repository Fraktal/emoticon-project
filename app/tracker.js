/*
To make the tracker.js consistent with other code in the lab, I got rid of the mongojs and installed
mongodb instead. I figured this way everyone is familiar with the syntax and would make things easier 
across the board. 

I also changed some of the variables names. I will just keep tracking the emoticons via the tweets
variable until we (Semmy) can figure out why the 'statuses/filter', ['track'] is giving the sleep
init() when we run the file.
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

new mongodb.Db('tweets', server, {w:1}).open(function (error, client) {
  if (error)
      console.log(error);
  else
      collection = new mongodb.Collection(client, 'tweets');
      console.log('mongodb is connected!');
});

twit.immortalStream('statuses/sample', null, function(immortalStream) {
      immortalStream.on('data', function(data){
         var d = (data.created_at);
         var month = new Date(Date.parse(d)).getMonth()+1;
         var day = new Date(Date.parse(d)).getDate();
         var year = new Date(Date.parse(d)).getFullYear();
         var date = (year + "-" + month + "-" + day);
         var tweets = new Array();
         var tweets = data.text.match(/\s(.*)\s((?::|;|=)|(?:-)?(?:\)|D|P))/);
         var tweetString = JSON.stringify(tweets);
         console.log(date + ' Tweets: '+ tweetString);
         
         if (tweets != null)
         collection.insert({date: date, tweet: tweetString,}, {safe:true}, function(err, objects) {
          if (err) console.log(err);
          else console.log("===>  " + tweetString + " SAVED");                         
     });         
   });
});

