const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.error('Unhandle Exception! Shutting Down');
  console.error(err);
  process.exit(1);
});

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = require('./app');

const init = async () => {
  await mongoose.connect(process.env.DB_URI);

  const server = app.listen(process.env.SERVER_PORT, () =>
    console.error(`Server running on port ${process.env.SERVER_PORT}`),
  );

  process.on('unhandledRejection', (err) => {
    console.error('Unhandle Rejection! Shutting Down');
    console.error(err);
    server.close(() => {
      process.exit(1);
    });
  });
};

init();
