var express = require('express');
var router = express.Router();

//import from env
//need install npm install dotenv --save
const { APP_NAME } = process.env;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('media');
});

module.exports = router;
