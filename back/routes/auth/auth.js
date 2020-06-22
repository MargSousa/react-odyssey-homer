const  express  =  require('express');
const router = express.Router();
const connection = require('../../helpers/db');

router.post('/signup', function(req, res, next) {
  const formData = req.body;
  console.log(formData);
  connection.query('INSERT INTO users SET ?', [formData], (err, results) => {
    if (err) {
      res.status(500).send("Error saving new user").end();
    } else {
      res.sendStatus(200).end();
    }
  });
});

module.exports = router;