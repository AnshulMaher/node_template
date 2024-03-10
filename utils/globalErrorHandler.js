const handlErrorOnProduction = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      status: err.status,
      msg: err.message,
    });
  }

  console.error('Error ', err);
  return res.status(err.statusCode).render('error', {
    status: 'error',
    message: 'Something went very wrong!',
  });
};

const globalErrorHandler = (err, _, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    return handlErrorOnProduction(err, res);
  }

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = globalErrorHandler;
