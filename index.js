const Sentry = require('@sentry/node')

const { parseConfig, empty, prefix } = require('./utils')

function SentryMiddleware(config) {
  const _error = parseConfig(config)
  if(_error) {
    console.warn(prefix, _error)
    console.warn(prefix, 'Middleware disabled')

    return empty
  }

  try {
    Sentry.init({
      ...config
    })
  } catch(error) {
    console.warn(prefix, error)
    console.warn(prefix, 'Middleware disabled')

    return empty
  }

  return server => {
    return {
      onError(error, client) {
        Sentry.captureException(error)
      }
    }
  }
}

module.exports = SentryMiddleware
