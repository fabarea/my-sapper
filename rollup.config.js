import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss';
import {terser} from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

// Old default config. Check with that.
// const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
const onwarn = warning => {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
}
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

const postcssOptions = () => ({
    extensions: ['.scss', '.sass'],
    extract: false,
    minimize: true,
    use: [
        ['sass', {
            includePaths: [
                // './src/routes',
                './src/theme',
                './node_modules',
                // This is only needed because we're using a local module. :-/
                // Normally, you would not need this line.
            ]
        }]
    ]
});

export default {
    client: {
        input: config.client.input(),
        output: config.client.output(),
        plugins: [
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode)
            }),
            svelte({
                dev,
                hydratable: true,
                emitCss: true,
                css: true
            }),
            resolve({
                browser: true,
                dedupe
            }),
            commonjs(),

            json({
                namedExports: false,
                compact: !dev,
            }),

            postcss(postcssOptions()),

            legacy && babel({
                extensions: ['.js', '.mjs', '.html', '.svelte'],
                runtimeHelpers: true,
                exclude: ['node_modules/@babel/**'],
                presets: [
                    ['@babel/preset-env', {
                        targets: '> 0.25%, not dead'
                    }]
                ],
                plugins: [
                    '@babel/plugin-syntax-dynamic-import',
                    ['@babel/plugin-transform-runtime', {
                        useESModules: true
                    }]
                ]
            }),

            !dev && terser({
                module: true
            })
        ],

        onwarn,
    },

    server: {
        input: config.server.input(),
        output: config.server.output(),
        plugins: [
            replace({
                'process.browser': false,
                'process.env.NODE_ENV': JSON.stringify(mode)
            }),
            svelte({
                generate: 'ssr',
                dev
            }),
            resolve({
                dedupe
            }),
            commonjs(),

            json({
                namedExports: false,
                compact: !dev,
            }),

            postcss(postcssOptions())
        ],
        external: Object.keys(pkg.dependencies).concat(
            require('module').builtinModules || Object.keys(process.binding('natives'))
        ),

        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input(),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode)
            }),
            commonjs(),
            !dev && terser()
        ],

        onwarn,
    }
};
