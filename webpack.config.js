
const path = require('path');
const htmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, '/build'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.(jpg|png|gif|svg|pdf|ico|)$/,
                use:[
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path] [name]-[hash:8].[ext]'
                        }

                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|svg)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            limit:100000
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }

                ]
            },
            {
                test:/\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback:true,
        proxy:{
            '/api/**':{
                target:'http://localhost:3000',
                secure:false,
                changeOrigin:true
            }
        }

    },
    plugins: [
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}

