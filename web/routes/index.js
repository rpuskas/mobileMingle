var db = require('../private/db.js');

exports.client = function(req, res){
	
	res.sendfile('client/index.html')
	
};

exports.journeys = function(req, res){

	db.mobileMingle.open(function(err,client) {
		client.collection('journeys', function(err, collection) {   
			collection.find({}).toArray(function(err,docs) { 
				res.json(docs);  
				db.mobileMingle.close();
			}); 
		});  
	});
}

exports.addJourney = function(req, res){

	db.mobileMingle.open(function(err,client) {
		client.collection('journeys', function(err, collection) { 
			console.log(req.body);
			collection.insert(req.body,function(err){
				db.mobileMingle.close();
			});  
		});  
	});
}