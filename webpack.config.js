
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        Vendor: "./website/assets/js/vendor.js",
        App: ["@babel/polyfill/dist/polyfill.js", "./website/assets/js/app.js"]
    },
    mode: 'none',
    output: {
        path: __dirname + "/website/temp/js",
        filename: "[name].js"
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ["@babel/plugin-transform-runtime"]
            },
            test: /\.js$/,
            exclude: /node_modules/
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
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
