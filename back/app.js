// declare all the necessary libraries
require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const authRouter = require('./routes/auth/auth');
const connection = require('./helpers/db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;


// set up the application
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));

// Routers
app.use('/auth', authRouter);
app.get('/profile', passport.authenticate('jwt', { session:  false }), function (req, res) {
  res.send(req.user);
});

// 3 - Passport Setup
passport.use(new LocalStrategy(
  {
      usernameField: 'email',
      passwordField: 'password',
      session: false
  },
  function (email, password, cb) {
    connection.query('select * from users where email = ?', [email], (err, results) => {
      console.log("results", results);
      if (err) return cb(err);
      if(!results.length){ 
        return cb(null, false, {message: 'Invalid Email'})
      };
      if (!bcrypt.compareSync(password, results[0].password)){
        return cb(null, false, {message: 'Invalid Password'})
      } else {
        return cb(null, results[0])
      }
    })   
  })
);

// 5 -  Jane and Tarzan
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {
  return cb(null, jwtPayload);
}
));

// implement the API part
app.get("/", (req,res) => {
  res.send("youhou");
})

/// in case path is not found, return the 'Not Found' 404 code
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// launch the node server
let server  = app.listen( process.env.PORT || 5000, function(){
  console.log(`Listening on port ${server.address().port}`);
});