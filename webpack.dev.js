const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//报表
const merge = require('webpack-merge');
const common = require('./webpack.config');
const webpack = require('webpack')

let devConfig = {
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(le|c)ss$/,
            use: [
                "style-loader",
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('autoprefixer')({
                                browsers: ['> 0.15% in CN']
                            })
                        ]
                    }
                },
            ]
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ],
    devtool: 'inline-source-map', //js的sourcemap
    devServer: {
        contentBase: path.join(__dirname, 'dev'),
        compress: true,
        port: 5200,
        hot: true,
        open: true,
        overlay: {
            wranings: true,
            errors: true
        },
        publicPath: '/',
        watchOptions: {
            poll: true,
            ignored: /node_modules/,
            aggregateTimeout: 300
        },
        proxy: {
            '/api': { //使用"/api"来代替"真实地址" 
                target: 'https://api.seo.meiweixueyuan.cn/api', //真实地址
                secure: false, //https:
                changeOrigin: true, //改变源 
                pathRewrite: {
                    '^/api/': '' //路径重写 
                }
            }
        },
    }

}
module.exports = merge(common, devConfig)
