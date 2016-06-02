var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

// Serve up www folder
var serve = serveStatic('www', {'index': ['index.html', 'index.htm']});
var port = process.env.PORT || 3000;

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
});

// Listen
server.listen(port, function() {
  console.log('Server listening on port '+port);
});
