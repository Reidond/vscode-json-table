const base = require('./base')

base({ minify: true }).catch((e) => console.error(e.message))
