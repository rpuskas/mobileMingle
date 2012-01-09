var MongoDb = require('../lib/node_modules/mongodb').Db,
	Connection = require('../lib/node_modules/mongodb').Connection,
	Server = require('../lib/node_modules/mongodb').Server;

var host = 'localhost';
var port = Connection.DEFAULT_PORT; 

exports.MongoDb = MongoDb;
exports.mobileMingle = new MongoDb('mobileMingle', new Server(host, port, {}), {native_parser:false});       
