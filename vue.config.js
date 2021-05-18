const CopyWebpackPlugin = require("copy-webpack-plugin")
//需要以cdn方式在打包的时候引入的地址
let cdn = {
    font: [],
    css: [
        'https://s1.pstatp.com/cdn/expire-1-M/prism/9000.0.1/themes/prism-okaidia.css'
    ],
    js: [
    ],
    //不用preload的js
    externaljs: [
        'https://s1.pstatp.com/cdn/expire-1-M/vue/2.6.10/vue.min.js',
        'https://s1.pstatp.com/cdn/expire-1-M/prism/9000.0.1/prism.min.js',
        'https://s1.pstatp.com/cdn/expire-1-M/howler/2.1.2/howler.min.js',
        "https://res.wx.qq.com/open/js/jweixin-1.2.0.js",
        'https://s1.pstatp.com/cdn/expire-1-M/lottie-web/5.7.6/lottie.min.js',
    ]
}

let isProd = process.env.NODE_ENV === 'production'
cdn = isProd ? cdn : { css: ["./static/css/prism-okaidia.css"], js: [] }
let externals = {
    'vue': 'Vue',
    'prismjs': 'Prism',
    "howler": "window"
}
externals = isProd ? externals : {}
let plugins = isProd ? [] : [new CopyWebpackPlugin([{
    from: "./static",
    to: 'static'
}])]

module.exports = {
    // baseUrl: isProd ? "././" : "./",
    productionSourceMap: false,
    outputDir: 'wedding',
    filenameHashing: false,
    publicPath: isProd ? "././" : "./",
    configureWebpack: {
        // 用cdn方式引入
        externals,
        plugins
    },

    chainWebpack: config => {

        if (isProd) {
            // 不要预先渲染
            //config.plugins.delete("prefetch");
            // config.plugins.delete("preload");
            // // 压缩代码
            // config.optimization.minimize(true)
            // // 分割代码
            // config.optimization.splitChunks({
            //     chunks: 'all'
            // })
        }
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
        })
    }
}