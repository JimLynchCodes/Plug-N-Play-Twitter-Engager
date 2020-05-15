const winston = require('winston')

const today = new Date().
  toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).
  replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: `logs/twitter-cli-errors-${today}.log`, level: 'error' }),
    new winston.transports.File({ filename: `logs/twitter-cli-logs-${today}.log` })
  ]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = logger