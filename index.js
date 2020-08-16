const Sentry = require('@sentry/node')

function parseConfig(config) {
  if(!config)
    return 'No config found'
  else if(!config.dsn)
    return 'No DSN found in Config'

  return null
}

function SentryMiddleware(config) {
  const _error = parseConfig(config)
  if(_error) {
    console.warn('[mesa-sentry]', _error)
    console.warn('[mesa-sentry] Middleware disabled')

    return () => {}
  }

  Sentry.init({
    ...config
  })

  return server => {
    return {
      onError(error, client) {
        Sentry.captureException(error)
      }
    }
  }
}

module.exports = SentryMiddleware
