var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;

    response.writeHead(200, {"Content-Type": "application/json"});
    route(handle, pathname,function(content){   
		response.write(JSON.stringify(content));
	    response.end();
	});
	
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");  

}

exports.start = start