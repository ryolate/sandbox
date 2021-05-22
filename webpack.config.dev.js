const path = require('path');

module.exports = {
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'generated_app.js'
    },
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: './docs',
        watchContentBase: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
};
