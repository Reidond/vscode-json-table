import { baseEsbuildConf } from './base.mjs'

baseEsbuildConf({
    sourcemap: true,
    watch: {
        onRebuild(error, result) {
            if (error) {
                console.error('watch build failed:', error)
            } else {
                console.info('watch build succeeded:', result)
            }
        },
    },
}).catch((e) => console.error(e.message))
