var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.get_journies;
handle["/journies"] = requestHandlers.get_journies;

server.start(router.route, handle);