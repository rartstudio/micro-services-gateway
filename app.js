//use dotenv library
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//import additional router
const coursesRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const reviewsRouter = require('./routes/reviews');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const webhookRouter = require('./routes/webhook');
const orderPaymentsRouter = require('./routes/orderPayments');
const can = require('./middlewares/permission');

//import token
const refreshTokensRouter = require('./routes/refreshTokens');

//import middleware
const verifyToken = require('./middlewares/verifyToken');


const app = express();
const cors = require('cors');
let whitelist = ['http://localhost:3001', 'http://localhost:3002']
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users',cors(corsOptions), usersRouter);
app.use('/users', usersRouter);

//add routing additional on top
app.use('/media', mediaRouter);

//add middleware verifytoken . so authenticated user just can see endpoint
app.use('/courses',cors(corsOptions), coursesRouter);
app.use('/image-courses',verifyToken,imageCoursesRouter);
app.use('/lessons', cors(corsOptions),verifyToken,lessonsRouter);
app.use('/chapters',cors(corsOptions),verifyToken,chaptersRouter);
app.use('/mentors',verifyToken,mentorsRouter);
// app.use('/my-courses',cors(corsOptions),verifyToken,myCoursesRouter);
app.use('/my-courses',verifyToken,myCoursesRouter);
app.use('/reviews',verifyToken,reviewsRouter);
app.use('/webhook',webhookRouter);
app.use('/orders',verifyToken,orderPaymentsRouter);

//add refresh token endpoint
app.use('/refresh-tokens',cors(corsOptions),refreshTokensRouter);

//if front end done enable this
// app.use('/chapters',verifyToken, can('admin'), chaptersRouter);
// app.use('/lessons',verifyToken, can('admin'), lessonsRouter);
// app.use('/media',verifyToken, can('admin','student'), mediaRouter);
// app.use('/orders',verifyToken, can('admin','student'), orderPaymentsRouter);
// app.use('/mentors',verifyToken, can('admin'), mentorsRouter);
// app.use('/image-courses',verifyToken, can('admin'), imageCoursesRouter);
// app.use('/my-courses',verifyToken, can('admin','student'), myCoursesRouter);
// app.use('/reviews',verifyToken, can('admin','student'), reviewsRouter);

module.exports = app;
