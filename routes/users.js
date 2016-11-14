var express = require('express');
/*eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}]*/
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
