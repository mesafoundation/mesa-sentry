const prefix = '[mesa-sentry]'

function empty() {}

function parseConfig(config) {
  if(!config)
    return 'No config found'
  else if(!config.dsn)
    return 'No DSN found in Config'

  return null
}

module.exports = { parseConfig, empty, prefix }
