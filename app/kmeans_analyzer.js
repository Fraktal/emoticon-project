var kmeans = require('node-kmeans');
var dburl = 'localhost/querydb';
var collections = ['querydata'];
var db = require('mongojs').connect(dburl,collections);

var data = db.querydata.find().sort({tweet: 1}, function(err, data) {
    if(err)console.log('Tweet not found'); 
    else console.log(data);
});
 
/*var vectors = new Array();
for (var i = 0 ; i < data.length ; i++)
  vectors[i] = [ data[i]['data'] , data[i]['data']];

kmeans.clusterize(vectors, {k: 4}, function(err,res) {
  if (err) console.error(err);
  else console.log('%o',res);
});*/
