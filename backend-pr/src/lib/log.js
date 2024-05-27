import { createLogger, format, transports } from 'winston'
const MESSAGE = Symbol.for('message')

const jsonFormatter = (logEntry) => {
  const base = {
    timestamp: new Date(),
    app: ''
  }

  const json = Object.assign(base, logEntry)

  logEntry[MESSAGE] = JSON.stringify(json)

  return logEntry
}

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format(jsonFormatter)()
    })
  ],
  exitOnError: false
})

export default logger
