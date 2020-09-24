const express = require('express');
const router = express.Router();

//import from env
//need install npm install dotenv --save
const { APP_NAME } = process.env;

const mediaHandler = require('./handler/media');

router.post('/',mediaHandler.create);
router.get('/',mediaHandler.getAll);
router.delete('/:id',mediaHandler.destroy);

module.exports = router;
