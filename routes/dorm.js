var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dorm', { title: 'Dorm Rating' });
});

module.exports = router;
