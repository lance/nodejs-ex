var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');
var http    = require('http');

app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var OS_API_HOST = '127.0.0.1:8443';
var routes = getRoutes(OS_API_HOST);

app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : 'nothing but a thang'});
});

app.get('/routes', function(req, res) {
  res.render('routes.html', { routes : routes});
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);

function getRoutes(addr) {
  var o = {
    route: '/foo'
  };
  return o;
}
