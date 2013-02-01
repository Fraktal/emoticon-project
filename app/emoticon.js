//var twitter = require('ntwitter');
var twitter = require('immortal-ntwitter');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('localhost', 'test');
var credentials = require('./credentials.js');



var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

tweetDate = function(tweet) {
    var d = (tweet.created_at);
    var month = new Date(Date.parse(d)).getMonth()+1;
    var day = new Date(Date.parse(d)).getDate();
    var year = new Date(Date.parse(d)).getFullYear();
    var date = (year + "-" + month + "-" + day);
    return date;
}
       
t.immortalStream('statuses/filter', null, function(immortalStream) {
     immortalStream.on('data', function(data){
     	 data.forEach(function(tweet){
            var queryTweet = tweet.text.match(/\s(\w+)\s((?::|;|=)(?:-)?(?:\)|D|P))/); //I think this works??
            var queryText = queryTweet.tweet.text
            var date = tweetDate(data); 
     	 });	
         console.log(date + '  The tweets being tracked are: ' + queryText);
       });         
   });

