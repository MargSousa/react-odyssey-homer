const connection = require('../../helpers/db');
const express  =  require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err)
      res.status(500).json({ flash:  err.message });
    else
      res.json(results);
    });
});

router.post('/signup', function(req, res, next) {
  const { email, name, lastname , password} = req.body;
  let hash = bcrypt.hashSync(password, 10);
  const formData = [email, hash, name, lastname];
  connection.query( 'INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)', formData, (err, results) => {
    if (err)
      res.status(500).json({ flash:  err.message });
    else
      res.status(200).json({ flash:  "User has been signed up!" });
    });
});

router.post('/signin', function(req, res, next) {
  passport.authenticate('local',(err, user, info) => {
    console.log("passport", user);
    if(err) return res.status(500).send(err)
    if (!user) return res.status(400).json({message: info.message});
    const token = jwt.sign(JSON.stringify(user), 'your_jwt_secret');
    return res.json({user, token});
  })(req, res)
});

module.exports = router;