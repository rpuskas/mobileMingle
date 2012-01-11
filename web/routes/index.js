var db = require('../private/db.js');

exports.client = function(req, res){
	res.sendfile('client/index.html')
};

//The repitition below seems a bit rediculous, the callbacks are there to make sure they actions are performed serially
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
			collection.insert(req.body,function(err){
				res.json(req.body);
				db.mobileMingle.close();
			});  
		});  
	});
}

exports.deleteJourney = function(req, res){
	db.mobileMingle.open(function(err,client) {
		client.collection('journeys', function(err, collection) {
			console.log('removing',req.params.id); 
			var objectId = client.bson_serializer.ObjectID(req.params.id);
			collection.remove({'_id': objectId},function(err){
				res.json({success:true});
				db.mobileMingle.close();
			});  
		});  
	});
}