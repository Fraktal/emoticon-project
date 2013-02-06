var dburl = 'localhost/querydata';
var collections = ['querydata'];
var db = require('mongojs').connect(dburl,collections);
var tracker = require('./tracker.js');

db.querydata.find({queryText}, function(err, saveData){
    if(err || !saveData.length)console.log('Tweet: ' + querydata + ' not found');   
    else querydata.forEach(function(querydata){
    console.log('Tweet: ' + querydata + ' has been found');
    });
});

// this is not working. Can't figure out the find() for mongojs
// Once we get the this working, we can start coding the Kmeans algo