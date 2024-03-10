const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');

// routes
const userRouter = require('./app/user/routes');

// utils
const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// Register middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(helmet());
app.use(process.env.API_PREFIX, limiter);
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use(hpp());
app.use(compression());

// Register routes
app.get('/', (_, res) => {
  res.status(200).send('Success');
  res.end();
});
app.use(`${process.env.API_PREFIX}/users`, userRouter);
app.all('*', (req, _, next) =>
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`)),
);

app.use(globalErrorHandler);

module.exports = app;
