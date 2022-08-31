const webpack = require('webpack')
const path = require("path")

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: path.join(__dirname, "build"),
        compress: true,
        port: 8000,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_URL': JSON.stringify('https://localhost:5001/api'),
            'process.env.REACT_APP_CHAT_URL': JSON.stringify("https://localhost:5001/chat")
        }),
    ],
}