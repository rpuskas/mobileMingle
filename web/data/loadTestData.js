var Db = require('../node_modules/mongodb').Db,
	Connection = require('../node_modules/mongodb').Connection,
    Server = require('../node_modules/mongodb').Server;

var data = require('./data.js');

var host = 'localhost';
var port = Connection.DEFAULT_PORT;

var db = new Db('mobileMingle', new Server(host, port, {}), {native_parser:false}); 

db.open(function(err,db) {
    
	db.collection('journeys', function(err, collection) {   
		collection.insert(data.journeys, function(docs) { 
			db.close();
		});
	});  
	
});