const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION! Shutting down ...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB_CONNECTION_STRING = process.env.DB_HOST.replace(
  '<USER>',
  process.env.DB_USER
).replace('<PASSWORD>', process.env.DB_PASS);

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB connection successful!');
  });
// eslint-disable-next-line no-console
//.catch(() => console.log('DB connection failed!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNHANDLED REJECTION! Shutting down ...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('👏 SIGERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('💥 Process terminated!');
  });
});
