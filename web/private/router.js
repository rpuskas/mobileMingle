function route(handle, pathname, callback) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {  
	console.log('yup I am a function');
	handle[pathname](callback);
  } else {
    console.log("No request handler found for " + pathname);
    return callback("404 Not found");
  }
}

exports.route = route;