var kmeans = require('node-kmeans');
var natural = require('natural');
var dburl = 'localhost/querydb';
var collections = ['querydata'];
var db = require('mongojs').connect(dburl,collections);
//var parser = JSONStream.parse(['entities', /./);

var data = db.querydata.find().sort({tweet: -1}, function(err, data) {
    if(err)console.log('DATA NOT FOUND: ' + err); 
    //else console.log(data);
});

var count = 0;
var key;
  for(key in data){
    var value = data[key];
    count++;
}

        
//tokenize and stem tweets for each of the three to prepare for clustering
var smile_token = natural.PorterStemmer.attach();
console.log("i am really happy about this code".tokenizeAndStem());

var sad_token = natural.PorterStemmer.attach();
console.log("i am really sad this code sucks".tokenizeAndStem());

var neutral_token = natural.PorterStemmer.attach();
console.log("When I think f this code, I think whateva".tokenizeAndStem());


// Create the labels and the vectors describing the data
//var labels = new Array ;
var vectors = new Array ;
  for (var i = 0 ; i < key ; i++) {
      //labels[i] = data[i]['tweet'] ;
      vectors[i] = [ key[i]['date'] , key[i]['tweet']] ;
}

kmeans.clusterize(vectors, {k: 4}, function(err,res) {
  if (err) console.error(err);
  else console.log('%o',res);
});


//predictor for the closest 20 words to center from the cluster data
classifier = new natural.BayesClassifier();
classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the q', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');
classifier.train();
console.log(classifier.classify('i am short silver'));