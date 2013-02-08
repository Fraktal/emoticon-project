var kmeans = require('node-kmeans');
var dburl = 'localhost/querydb';
var collections = ['querydata'];
var db = require('mongojs').connect(dburl,collections);

var clusterData = db.querydata.find({tweet: 1}, function(err, querydata){
     if(err || !querydata.length)console.log('Tweet not found');   
     else querydata.forEach(function(querydata){
     console.log(querydata);
     });
});

// this is keeps throwing the err "tweet not found"
// Once we get the this working, we can start coding the Kmeans algo