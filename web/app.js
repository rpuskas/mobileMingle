var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/client'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', routes.client);
app.get('/journeys', routes.journeys)
app.post('/journeys', routes.addJourney)
app.delete('/journeys/:id', routes.deleteJourney)

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
