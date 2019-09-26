const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //生成css文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css文件的压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js文件压缩的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); //清理旧文件插件


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
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            { //js压缩loader
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
            filename: 'index.html', //生成文件
            template: path.resolve(__dirname, './index.html'), //模板
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: false
            }
        }),
        new CleanWebpackPlugin()
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
