var Db = require('../lib/node_modules/mongodb').Db,
	Connection = require('../lib/node_modules/mongodb').Connection,
    Server = require('../lib/node_modules/mongodb').Server;

var data = require('./data.js');

var host = 'localhost';
var port = Connection.DEFAULT_PORT;

var db = new Db('mobileMingle', new Server(host, port, {}), {native_parser:false}); 

db.open(function(err,db) {
    
	db.collection('journies', function(err, collection) {   
		collection.insert(data.journies, function(docs) { 
			db.close();
		});
	});  
	
});