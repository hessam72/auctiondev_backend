const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const winstonInstance = require('./winston');
const routes = require('../index.route');
const config = require('./config');
const APIError = require('../server/helpers/APIError');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const Slack = require('../server/helpers/Slack');

const swaggerDocument = YAML.load(`${__dirname}/../swagger/swagger.yaml`);

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(express.static(`${__dirname}/../public`));
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors('http://localhost:7700'));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
// enable detailed API logging in dev env
// if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use('/swagger', swaggerUi.serve);
  app.get('/swagger', swaggerUi.setup(swaggerDocument));
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg:
        'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
// }

// mount all routes on /api path
app.use('/api', routes);

app.get('*', (
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) => res.file('./index.html'));
// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors
      .map(error => error.messages.join('. '))
      .join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    winstonInstance.log('error', err.status, error);
    // Slack.log({level:'error', message:  unifiedErrorMessage, status: err.status, error});
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    // Slack.log({level:'error', message:  err.message, status: err.status, apiError});
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  winstonInstance.log('error', 'API not found', err);
  // Slack.log({level:'error', message: 'API not found', err});
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(
    expressWinston.errorLogger({
      winstonInstance,
    })
  );
}

// error handler, send stacktrace only during development
app.use((
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) => {
 Slack.log({ level: 'error', message: err.message, ...err , stack: err.stack});
 return res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
  });
}
);

module.exports = app;
