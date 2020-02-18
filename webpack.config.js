const path = require('path')

 module.exports ={
    "mode": "none",
    "entry": {
        drivers: 'drivers/background.js',
        views: 'views/context.js',
    },
    "output": {
        "path": path.resolve(__dirname, "dist"),
        "filename": "[name].bundle.js"
    },
    "devtool": "source-map",
    "module": {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
    }
}