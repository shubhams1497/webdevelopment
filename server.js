//var express    = require("express");
 var mysql      = require('mysql');
 var con = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'tasktable'
 });
 //var app = express();
 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*Create a table where the field "id" is primary key:*/
  var sql = "CREATE TABLE IF NOT EXISTS task(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

});


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});


io.on('connection', function(socket) {

   socket.on('msg', function(data) {
      //Send message to everyone
    	sql = "INSERT INTO task(name, description) VALUES ( '" + data.name + "','" +  data.desc + "')";
  		con.query(sql, function (err, result) {
    	if (err) throw err;
    		console.log("1 record inserted");
  		});

  		con.query("SELECT * FROM task", function (err, result, fields) {
    	if (err) throw err;
    		io.sockets.emit('newmsg', result);
  		});
   		//console.log(sql);
   })

});



http.listen(3000, function() {
   console.log('listening on localhost:3000');
});



//app.listen(3000);