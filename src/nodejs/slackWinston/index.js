const fs = require('fs');
const config = require('config');
const winston = require('winston');
const WinstonSlack = require('winston-slack-hook');
const RotateFile = require('winston-daily-rotate-file');

const env = process.env.NODE_ENV || 'development';
const loggerEnabledStatus = process.env.LOGGER || 'all';
const logDirectory = './logs';

// Create the logger directory if it does not exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const transports = [
  // colorize the output to the console
  new (winston.transports.Console)({
    timestamp: () => (new Date()).toLocaleTimeString('en-US', {
      hour12: false,
    }),
    colorize: true,
    level: 'info',
  }),
  new (RotateFile)({
    filename: `${logDirectory}/-imhotep.log`,
    timestamp: () => (new Date()).toISOString(),
    datePattern: 'yyyy-MM-dd',
    prepend: true,
    maxFiles: 14,
    level: env === 'development' ? 'verbose' : 'info',
  }),
];

if (env === 'production') {
  transports.push(new (WinstonSlack)({
    hookUrl: config.get('SLACK.urlChannelErrorsImhotep'), //maybe it's better in the .env
    username: 'username',
    channel: 'channel',
    level: 'error', // if you choose warning you will receive error & warning
  }));
}

const customLogger = new (winston.Logger)({
  transports,
});

if (env === 'test' || loggerEnabledStatus === 'none') {
  customLogger.remove(winston.transports.Console);
}

const createLabel = // should be changed
  (filename, functionName, message) => {
    if (!filename || !functionName || !message) {
      return `filename: ${filename}\n\tfunctionName: ${functionName}\n\tmessage: ${message}`;
    }
    const res = new RegExp(/\/(?:src|dist)(\/.*)/, 'gi').exec(filename);
    return `${(res && res[1]) ? res[1] : 'File is out of logger scope'} :: ${functionName} : ${message} \n\t`;
  };

const info = (filename, functionName, message, ...rest) => // should be changed
  customLogger.info(createLabel(filename, functionName, message), ...rest);

const warn = (filename, functionName, message, ...rest) =>
  customLogger.warn(createLabel(filename, functionName, message), ...rest);

const error = (filename, functionName, message, ...rest) => {
  const errorsObjects = rest
    .filter(e => e.stack)
    .reduce((acc, e) => `\`\`\`${acc}${e.stack}\`\`\`\n`, '');
  const others = rest
    .filter(e => !e.stack);
  customLogger
    .error(
      createLabel(filename, functionName, message),
      errorsObjects,
      ...others.length > 0 ? [others] : [],
    );
};

exports.info = info;
exports.warn = warn;
exports.error = error;
