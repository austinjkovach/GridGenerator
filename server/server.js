
var express = require('express');
var path = require('path');
var app = express();

var port = 4000;

var assetFolder = path.resolve(__dirname + '/../dist');

app.use(express.static(assetFolder));

app.get('/*', function(req, res) {
  res.sendFile(assetFolder + '/index.html');
});

app.listen(port, function(){
  console.log('listening on port', port);
});