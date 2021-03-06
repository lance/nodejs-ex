var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');
var https   = require('https');

app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var OS_API_HOST = '10.2.2.2',
    OS_API_PORT = '8443',
    OS_API_PATH = '/oapi/v1',
    routes;

getRoutes();

app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : 'nothing but a thang'});
});

app.get('/routes', function(req, res) {
  res.render('routes.html', { data : routes });
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);

function getRoutes(addr) {
  var options = {
    host : OS_API_HOST,
    path: OS_API_PATH,
    port: OS_API_PORT
  };

  var request = https.request(options, function(res) {
    routes = res;
  });
  request.on('error', function(err) {
    routes = {error: err};
  });

  request.end();
}
