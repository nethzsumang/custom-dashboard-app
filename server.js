var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

var port = process.env.PORT || 5000;
app.listen(port);
