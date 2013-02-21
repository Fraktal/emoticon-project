var kmeans = require('node-kmeans');
var natural = require('natural');
var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/tweets'),
    Collection = mongoose('tweets',db);

Collection.find({tweet: -1}).each(function(saved_data){
  console.log(saved_data);
});    


/*db.tweets.find({tweet: -1}, function(err, saved_data) {
  if(err) console.log(err);
  else console.log(save_data);
});*/


      
//tokenize and stem tweets for each of the three to prepare for clustering
var smile_token = natural.PorterStemmer.attach();
console.log("i am really happy about this code".tokenizeAndStem());

var sad_token = natural.PorterStemmer.attach();
console.log("i am really sad this code sucks".tokenizeAndStem());

var neutral_token = natural.PorterStemmer.attach();
console.log("When I think f this code, I think whateva".tokenizeAndStem());


// Create the labels and the vectors describing the data
//var labels = new Array ;
/*var vectors = new Array ;
  for (var i = 0 ; i < key ; i++) {
      //labels[i] = data[i]['tweet'] ;
      vectors[i] = [ key[i]['date'] , key[i]['tweet']] ;
}

kmeans.clusterize(vectors, {k: 4}, function(err,res) {
  if (err) console.error(err);
  else console.log('%o',res);
});*/


//predictor for the closest 20 words to center from the cluster data
classifier = new natural.BayesClassifier();
classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the q', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');
classifier.train();
console.log(classifier.classify('i am short silver'));