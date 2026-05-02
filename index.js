const mongoose = require('mongoose');
const util = require('util');


// config should be imported before importing any other file
require('./config/Extension');
const config = require('./config/config');
const app = require('./config/express');
const debug = require('debug')('myapp:index');
// make bluebird default Promise
// eslint-disable-next-line import/newline-after-import
Promise = require('bluebird'); // eslint-disable-line no-global-assign
mongoose.Promise = Promise;
const mongoUri = config.mongo.host;
// const mongoUri = 'mongodb://192.168.43.14:27017/auction';
mongoose.connect(mongoUri, {
  // user: '',
  // pass: '',
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  useFindAndModify: false,
  // useCreateIndex: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection.on('error', (err) => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}
module.exports = app;
