var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listEvents', function (req, res) {
   fs.readFile( __dirname + "/" + "events.json", 'utf8', function (err, data) {
       console.log( data );
       res.header('Access-Control-Allow-Origin',"*" )
       res.end( data );
   });
})

var server = app.listen(8001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})