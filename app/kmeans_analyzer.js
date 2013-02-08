var kmeans = require('kmeans');
var dburl = 'localhost/querydb';
var collections = ['querydata'];
var db = require('mongojs').connect(dburl,collections);

var clusterData = db.querydata.find({tweet: 1}, function(err, querydata){
     if(err || !querydata.length)console.log('Tweet not found');   
     else querydata.forEach(function(querydata){
     console.log(querydata);
     });
});

/*var vectors = new Array();
for (var i = 0 ; i < data.length ; i++)
  vectors[i] = [ data[i]['data'] , data[i]['data']];

kmeans.clusterize(vectors, {k: 4}, function(err,res) {
  if (err) console.error(err);
  else console.log('%o',res);
});*/

// this is keeps throwing the err "tweet not found"
// Once we get the this working, we can start coding the Kmeans algo