var twitter = require('immortal-ntwitter')
var express = require('express');
var app = express();
var credentials = require('./credentials.js');

var twit = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});
 
app.listen(3000);

twit.immortalStream('statuses/sample', null, function(immortalStream) {
      immortalStream.on('data', function(data){
         var d = (data.created_at);
         var month = new Date(Date.parse(d)).getMonth()+1;
         var day = new Date(Date.parse(d)).getDate();
         var year = new Date(Date.parse(d)).getFullYear();
         var date = (year + "-" + month + "-" + day);
         var queryText = data.text.match(/\^|\s(.*)\s((?::|;|=)(?:-)?(?:\)|D|P))|\$/);

         console.log(date + ' The tweets are '+ queryText);
       });         
   });