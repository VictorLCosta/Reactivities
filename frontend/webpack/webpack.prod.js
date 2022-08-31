const webpack = require('webpack')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_URL': JSON.stringify('/api'),
            'process.env.REACT_APP_CHAT_URL': JSON.stringify("/chat")
        }),
    ],
}