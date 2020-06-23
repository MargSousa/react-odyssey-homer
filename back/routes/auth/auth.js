const  express  =  require('express');
const router = express.Router();
const connection = require('../../helpers/db');

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err)
      res.status(500).json({ flash:  err.message });
    else
      res.json(results);
    });
});

router.post('/signup', function(req, res, next) {
  const formData = req.body;
  console.log(formData);
  connection.query('INSERT INTO users SET ?', [formData], (err, results) => {
    if (err)
      res.status(500).json({ flash:  err.message });
    else
      res.status(200).json({ flash:  "User has been signed up!" });
    });
});

module.exports = router;