# mesa-sentry
Sentry middleware for Mesa

## Installation
```
npm install --save mesa-sentry
```
```
yarn add mesa-sentry
```

## Usage
```js
import Mesa from '@cryb/mesa'
import Sentry from 'mesa-sentry'

const mesa = new Mesa()
mesa.use(Sentry({
  dsn: process.env.SENTRY_DSN
}))

// ...
```

## License
MIT
