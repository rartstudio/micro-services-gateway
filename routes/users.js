const express = require('express');
const router = express.Router();

//import from env
//need install npm install dotenv --save
const { APP_NAME } = process.env;

const usersHandler = require('./handler/users');

//import middleware
const verifyToken = require('../middlewares/verifyToken');

router.post('/register',usersHandler.register);
router.post('/login',usersHandler.login);

//need to have jwt first before update profile
router.put('/',verifyToken,usersHandler.update);

//need to have jwt token before get profile
router.get('/',verifyToken,usersHandler.getUser);

module.exports = router;
