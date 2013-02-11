var kmeans = require('node-kmeans');
var dburl = 'localhost/querydb';
var collections = ['querydata'];
var db = require('mongojs').connect(dburl,collections);

var data = db.querydata.find().sort({tweet: 1}, function(err, data) {
    if(err)console.log('DATA NOT FOUND: ' + err); 
    //else console.log(data);
});

var count = 0;
var key;
for(key in data){
    var value = data[key];
    count++;
}

  // Create the labels and the vectors describing the data

var labels = new Array ;
var vectors = new Array ;
  for (var i = 0 ; i < key ; i++) {
      labels[i] = data[i]['tweet'] ;
      vectors[i] = [ data[i]['smiley'] , data[i]['sad'], data[i]['neutral']] ;
}

kmeans.clusterize(vectors, {k: 4}, function(err,res) {
  if (err) console.error(err);
  else console.log('%o',res);
});

