const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//生成css文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')



module.exports = {
    mode: 'production',
    entry: './src/index',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
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
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({})]
    }

}
