const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //生成css文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dev')
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
                    },
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/,
                //include: [path.resolve(__dirname, 'src/')],
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'webpack强大',
            filename: 'index.html', //生成文件
            template: path.resolve(__dirname, './index.html'), //模板
            minify: {
                collapseWhitespace: true, //压缩？
                removeComments: true, //移除注释？
                removeAttributeQuotes: false //移除属性的双引号？
            }
        }),
        new CleanWebpackPlugin()
    ],

}
