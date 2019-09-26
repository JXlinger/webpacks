const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//生成css文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dev')
    },



    module: {
        rules: [
            {
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
                                require('autoprefixer')({ browsers: ['> 0.15% in CN'] })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jepg|gif|svg)$/,
                use: ['file-loader']
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
            filename: 'index.html',//生成文件
            template: path.resolve(__dirname, './index.html'),//模板
            minify: {
                collapseWhitespace: true,//压缩？
                removeComments: true,//移除注释？
                removeAttributeQuotes: false//移除属性的双引号？
            }
        }),
        new CleanWebpackPlugin()
    ],

}
