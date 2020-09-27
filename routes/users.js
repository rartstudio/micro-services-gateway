const express = require('express');
const router = express.Router();

//import from env
//need install npm install dotenv --save
const { APP_NAME } = process.env;

const usersHandler = require('./handler/users');

router.post('/register',usersHandler.register);
router.post('/login',usersHandler.login);

module.exports = router;
