import esbuild from 'esbuild'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import postCssPlugin from '@deanc/esbuild-plugin-postcss'

function baseEsbuildConf(options) {
    return esbuild.build({
        entryPoints: ['./src/extension.ts'],
        bundle: true,
        external: ['vscode'],
        outfile: 'dist/main.js',
        format: 'cjs',
        platform: 'node',
        plugins: [
            postCssPlugin({
                plugins: [tailwindcss, autoprefixer],
            }),
        ],
        ...options,
    })
}

export { baseEsbuildConf }
