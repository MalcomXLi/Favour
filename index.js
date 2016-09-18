var express = require('express');
var router = express.Router();
var async = require('async');
var pg = require('pg');
var bodyParser = require('body-parser');
var passport = require('passport-facebook');
var port = process.env.PORT || 8000;

var app = express();

var FACEBOOK_APP_ID = 185577565209272;
var FACEBOOK_APP_SECRET = '73bd80a50f7ac73b518c5721eca001b1';
var connectionString = process.env.DATABASE_URL || 'postgresql://root@104.196.183.161:26257?sslmode=disable';
var client = new pg.Client(connectionString);
console.log(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/findPerson', function(req, res) {
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

var server = app.listen(port, function (cb) {
  var port = server.address().port;
  console.log('Listening on port http://localhost:%s', port);
});