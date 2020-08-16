const Mesa = require('@cryb/mesa').default

const Sentry = require('..')

const mesa = new Mesa()
mesa.use(Sentry({ dsn: 'my_dsn' }))
