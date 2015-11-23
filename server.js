var config = require('./config');

var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var pem = require('pem');

var app = express();
var httpPort = process.env.PORT || config.server.httpPort;
var httpsPort = process.env.PORT || config.server.httpsPort;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/build/app'));

// Error handler
app.use(function(err, req, res, next){
  if (!err) return next();
  console.error("Error");
  console.error(err);
  res.json(err.statusCode, { code: 1, message: "Error."});
});

app.use(express.favicon(__dirname + '/build/app/images/favicon.ico'));

var httpServer = http.createServer(app);
httpServer.listen(httpPort, function() {
console.log('HTTP server listening port ' + httpPort);
});

pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
  if(err) {
    console.log(err);
  }
  else {
    var httpsServer = https.createServer({key: keys.serviceKey, cert: keys.certificate}, app);
    httpsServer.listen(httpsPort, function() {
      console.log('HTTPS server listening port ' + httpsPort);
    });
  }
});

app.get('*', function(req, res) {
  res.sendfile('build/app/index.html', { root: path.join(__dirname) });
});