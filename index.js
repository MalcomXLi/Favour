var express = require('express');
var router = express.Router();
var async = require('async');
var pg = require('pg');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

var app = express();

// var connectionString = process.env.DATABASE_URL || 'postgresql://root@104.196.183.161:26257?sslmode=disable';
// var client = new pg.Client(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// app.get('/test', function(req, res) {
//   try{
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, function(err, client, done) {
//       // Handle connection errors
//       if(err) {
//         done();
//         console.log(err);
//         return res.status(500).json({ success: false, data: err});
//       }

//       var accountTable = '<table class="table table-striped table-bordered"><tr><th>User</th><th>Balance</th></tr>';

//       var query = client.query("SELECT name, balance FROM bank.accounts;");

//       query.on('row', function(row) {
//         accountTable = accountTable + '<tr><td>' + row.name + '</td><td>' + row.balance +' </td></tr>';
//        });

//       query.on('end', function() {
//         accountTable += "</table>";
//         if (err) {
//           throw (err);
//         }
//         done();
//         res.send(accountTable);
//       });

//       query.on('error', function(err) {
//         console.log(err);
//         res.status(500).json({ success: false, data: err});
//         done();
//       });
//     });
//   } catch(ex) {
//     console.log('error', ex);
//   }
// });

var server = app.listen(port, function (cb) {
  var port = server.address().port;
  console.log('Listening on port http://localhost:%s', port);
});