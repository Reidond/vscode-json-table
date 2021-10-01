import { baseEsbuildConf } from './base.mjs'

baseEsbuildConf({ minify: true }).catch((e) => console.error(e.message))
