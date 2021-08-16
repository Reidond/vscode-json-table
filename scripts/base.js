const esbuild = require('esbuild')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')
const postCssPlugin = require('@deanc/esbuild-plugin-postcss')

module.exports = function (options) {
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
