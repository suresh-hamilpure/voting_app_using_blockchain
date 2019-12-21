// Module dependencies.
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path');


var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");


var connection = mysql.createConnection({   // Creating the connection object
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'test'
            });
 
connection.connect();     // Connecting to the database
global.db = connection;   // global.varName is accessible from any module.
// https://productbuilder.wordpress.com/2013/09/06/using-a-single-global-db-connection-in-node-js/
 

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');     // https://stackoverflow.com/a/41055903
// __dirname  =>  Current directory of app.js  =>  F:\test\nodejs_auth_example
app.set('view engine', 'ejs');              // Set EJS as the view engine for our Express application.


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 


app.get('/', routes.index);   //call for main index page

app.get('/signup', user.signup);
app.post('/signup', user.signup);

app.get('/login', routes.index);
app.post('/login', user.login);

app.get('/home/voting', user.voting_page);

app.get('/home/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/profile',user.profile);


app.listen(3000)
