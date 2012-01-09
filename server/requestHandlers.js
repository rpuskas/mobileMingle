var db = require('./db.js');

function get_journies(callback) {
	
	db.mobileMingle.open(function(err,client) {
		client.collection('journies', function(err, collection) {   
			collection.find({}).toArray(function(err,docs) { 
				callback(docs);  
				db.mobileMingle.close();
			}); 
		});  

	});

}

exports.get_journies = get_journies; 