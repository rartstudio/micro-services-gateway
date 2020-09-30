const express = require('express');
const router = express.Router();

//import from env
//need install npm install dotenv --save
const { APP_NAME } = process.env;

const refreshTokensHandler = require('./handler/refresh-tokens');

router.post('/',refreshTokensHandler.refreshToken);

module.exports = router;
