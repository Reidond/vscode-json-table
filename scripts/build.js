const base = require('./base')

base({ sourcemap: true }).catch((e) => console.error(e.message))
