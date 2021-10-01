import { baseEsbuildConf } from './base.mjs'

baseEsbuildConf({ sourcemap: true }).catch((e) => console.error(e.message))
