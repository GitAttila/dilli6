
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./website/assets/js/app.js",
    mode: 'production',
    output: {
        filename: "App.js",
        chunkFilename: "shared.js",
        path: __dirname + "/website/temp/js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/, 
            loader: 'babel-loader',
            options: {
                presets: [
                    "@babel/preset-env"
                ],
                plugins: [
                    "@babel/plugin-transform-runtime"
                ]
            }
        }]
    },
    resolve: {
        alias: {
            "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
            "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
            "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
            "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
            "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
            "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
            "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            // new UglifyJsPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
