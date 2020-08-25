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
        Sentry.configureScope(scope => {
          scope.setTag('client_facing', client ? 'yes' : 'no')

          if(client) {
            if(client.authenticated)
              scope.setTag('client_id', client.id)

            scope.setTag('authenticated', client.authenticated ? 'yes' : 'no')
          }

          Sentry.captureException(error)

          scope.clear()
        })
      }
    }
  }
}

module.exports = SentryMiddleware
