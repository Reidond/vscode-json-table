const base = require('./base')

base({
    sourcemap: true,
    watch: {
        onRebuild(error, result) {
            if (error) {
                console.error('watch build failed:', error)
            } else {
                console.error('watch build succeeded:', result)
            }
        },
    },
}).catch((e) => console.error(e.message))
