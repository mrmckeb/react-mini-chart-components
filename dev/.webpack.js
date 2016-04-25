var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        './dev/example/app.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/public/'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                include: path.join(__dirname, '../'),
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [
                        ['transform-react-display-name'],
                        ['react-transform', {
                            'transforms': [
                                {
                                    'transform': 'react-transform-hmr',
                                    'imports': ['react'],
                                    'locals': ['module']
                                }
                            ]
                        }]
                    ]
                }
            }
        ]
    },
        resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
