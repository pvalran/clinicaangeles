const path = require("path");

module.exports = {
    entry: path.resolve(__dirname,"src/index.jsx"),
    output: {
        path: path.resolve(__dirname,"public"),
        filename:"bundle.js"
    },
    resolve:{
        extensions:[".js",".jsx"]
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:["babel-loader"]
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            /*{
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: { name: '/static/[name].[ext]' }
            }*/
        ]
    },
    devServer:{
        contentBase: path.resolve(__dirname,"public"),
        port:9000
    }
};
