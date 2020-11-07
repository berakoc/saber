const path = require('path')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'saber.js',
        library: 'saber',
        libraryTarget: 'commonjs2'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\\.js$/,
                include: [path.resolve(__dirname, 'release')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: ['babel-loader']
            },
        ],
    },
}
