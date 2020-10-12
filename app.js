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
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const reviewsRouter = require('./routes/reviews');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');

//import token
const refreshTokensRouter = require('./routes/refreshTokens');

//import middleware
const verifyToken = require('./middlewares/verifyToken');


const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//add routing additional on top
app.use('/media', mediaRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);

//add middleware verifytoken . so authenticated user just can see endpoint
app.use('/courses', coursesRouter);
app.use('/image-courses',verifyToken,imageCoursesRouter);
app.use('/lessons', verifyToken,lessonsRouter);
app.use('/chapters',verifyToken,chaptersRouter);
app.use('/mentors',verifyToken,mentorsRouter);
app.use('/my-courses',verifyToken,myCoursesRouter);
app.use('/reviews',verifyToken,reviewsRouter);

//add refresh token endpoint
app.use('/refresh-tokens',refreshTokensRouter);

module.exports = app;
