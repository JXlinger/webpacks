const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //生成css文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css文件的压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js文件压缩的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); //清理旧文件插件


module.exports = {
    entry: './src/index.js',
    resolve: {
        alias: {
            //vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
            '@': path.resolve(__dirname, 'src/')
        },
        extensions: [".js", ".vue",".json"]
    },
    module: {
        rules: [{
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 45000
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
            { //es6转es5
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    {
                        loader: "eslint-loader",
                        //exclude: (__dirname, 'node_modules'),
                        options: {
                            // eslint options (if necessary)
                            fix: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
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
        minimizer: []
    }

}
