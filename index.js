var express = require('express');
var router = express.Router();
var async = require('async');
var pg = require('pg');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var path = require('path');

var app = express();

var connectionString = process.env.DATABASE_URL || 'postgresql://root@104.196.183.161:26257?sslmode=disable';
var client = new pg.Client(connectionString);


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

/*
CREATE TABLE accounts(
  firstname STRING(50),
  lastname STRING(50),
  username STRING(50) NOT NULL,
  phonenumber STRING(20),
  email STRING(50)
);
INSERT INTO accounts (firstname, lastname, username, phonenumber, email)
VALUES ('jonathan', 'wen', 'jonathanwen', '4167128801', 'jwen@jwen.ca');
*/

app.post('/user', function (req, res) {
  var user = req.body;
  console.log("FUCK : ", user);
  createUser(user, res);
});

app.post('/login', function(req, res) {
  console.log(req);
  try {
    var userId = req.body.userId;
    var authToken = req.body.authToken;
  } catch(e) {
    console.log('error', e);
  }
});

app.get('/getPersonByUsername', function(req, res) {
  try{
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      var accountTable = '<table class="table table-striped table-bordered"><tr><th>User</th><th>Balance</th></tr>';

      var query = client.query("SELECT * FROM users.accounts;");

      query.on('row', function(row) {
        accountTable = accountTable + '<tr><td>' + row.id + '</td><td>' + row.name +' </td></tr>';
      });

      query.on('end', function() {
        accountTable += "</table>";
        if (err) {
          throw (err);
        }
        done();
        res.send(accountTable);
      });

      query.on('error', function(err) {
        console.log(err);
        res.status(500).json({ success: false, data: err});
        done();
      });
    });
  } catch(ex) {
    console.log('error', ex);
  }
});

function createUser(user, res) {
  try{
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log("ERROR : ", err);
        return res.status(500).json({ success: false, data: err});
      }
 	console.log("ASASA");
      var query = client.query("INSERT INTO users.accounts (firstname, lastname, username, phonenumber, email)\
                                VALUES ($1, $2, $3, $4, $5)", [user.first_name, user.last_name,'malcom', '416-343-3433', user.email]);

      query.on('end', function(results) {
        done();
        return res.status(200).send(results);
      });

      query.on('error', function(err) {
        console.log(err);
        res.status(500).json({ success: false, data: err});
        done();
      });
    });
  } catch(ex) {
    console.log('error', ex);
  }
}
var server = app.listen(port, function (cb) {
  var port = server.address().port;
  console.log('Listening on port http://localhost:%s', port);
});
