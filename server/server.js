'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var http = require('http');
var https = require('https');
var sslConfig = require('./ssl-config');

var app = module.exports = loopback();

app.start = function () {
  // start the web server
  // https config
 // /*
    var server = null;
    var options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate
    };
    server = https.createServer(options, app);
  
    server.listen(app.get('port'), function () {
      var baseUrl = 'https://' + app.get('host') + ':' + app.get('port');
      // var baseUrl = 'https://localhost' + ':' + app.get('port');
      app.emit('started', baseUrl);
      console.log('Loopback server listening @ %s%s', baseUrl, '/');
      if (app.get('loopback-component-explorer')) {
        var explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
  
    return server;
    //*/
/* http config
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  */
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
