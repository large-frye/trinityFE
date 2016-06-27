var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  http = require('http'),
  path = require('path'),
  reload = require('reload');

var request = require('request')
, app = express()
, appPath = 'trinityFE'
, localServerStorage= 'php/TrinityServer/storage/exports';

app.set('port', process.env.PORT || 8000);
app.use(bodyParser());
app.use(methodOverride());
app.use('/', express.static(__dirname + '/'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.use('/storage', express.static(__dirname.replace(appPath, '') + localServerStorage));

console.log(__dirname.replace(appPath, '') + localServerStorage);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('start server @ ' + app.get('port'));
});
