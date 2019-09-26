const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //生成css文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css文件的压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js文件压缩的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')//生成html
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清理旧文件插件


module.exports = {
    mode: 'production',
    entry: './src/index.js',
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
            },
            {
                test: /\.(png|jpg|jepg|gif|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            title: 'webpack强大',
            filename: 'index.html',//生成文件
            template: path.resolve(__dirname, './index.html'),//模板
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: false
            }
        }),
        new CleanWebpackPlugin(['dist'])
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
