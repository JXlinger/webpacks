const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//生成css文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css文件的压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js文件压缩的插件
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); //清理旧文件插件
const merge = require('webpack-merge');
const common = require('./webpack.config');

let proConfig = {
    mode: 'production',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
        ]
    }

}
module.exports = merge(common, proConfig)