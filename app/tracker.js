var twitter = require('immortal-ntwitter')
var express = require('express');
var credentials = require('./credentials.js');
//var db = require("./db"); for app.js
var dburl = 'localhost/emoticon-project';
var collections = ['querydata'];
var db = require('mongojs').connect(dburl,collections);
var app = express();

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
         var queryText = data.text.match(/\s(.*)\s((?::|;|=)(?:-)?(?:\)|D|P))/);

         console.log(date + ' The tweets are '+ queryText);

         db.querydata.save(queryText, function(err, saveData){
         if(err || !saveData) console.log("This text " + queryText + " not saved because of " + err);
         else console.log("This text " + queryText + " saved");  
        });
      });         
   });

function querydata (queryText, date){
       this.queryText = queryText;
       this.date = date;
}
