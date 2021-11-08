const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        console.log(argv)
        return {
            context: path.resolve(__dirname, "template"),
            mode: "development",
            entry: {
                script: "./script.js",
            },
            output: {
                library: "bundle",
                filename: "bundle.js",
                libraryTarget: "umd",
                path: path.resolve(__dirname, "core/static"),
            },
            plugins: [
                new CleanWebpackPlugin(),
                new CopyPlugin({
                    patterns: [
                        {
                            from: path.resolve(__dirname, "template", 'images'),
                            to: path.resolve(__dirname, "widget", 'images')
                        },
                        {
                            from: path.resolve(__dirname, "template", 'i18n'),
                            to: path.resolve(__dirname, "widget", 'i18n')
                        },
                        {
                            from: path.resolve(__dirname, "template", "index.css"),
                            to: path.resolve(__dirname, "widget", "[name].css")
                        },
                        {
                            from: path.resolve(__dirname, "template", "manifest.json"),
                            to: path.resolve(__dirname, "widget", "[name].json")
                        },
                        {
                            from: path.resolve(__dirname, "core/assets/dev_script.js"),
                            to: path.resolve(__dirname, "widget", "script.js")
                        }
                    ]
                })
            ]
        }
    } else if (argv.mode === 'production') {
        return {

            context: path.resolve(__dirname, "template"),
            mode: "production",
            entry: {
                script: "./script.js",
            },
            output: {
                library: "bundle",
                filename: "bundle.js",
                libraryTarget: "umd",
                path: path.resolve(__dirname, "prod"),
            },
            plugins: [
                new CleanWebpackPlugin(),
                new CopyPlugin({
                    patterns: [
                        {
                            from: 'images',
                            to: 'images',
                        },
                        {
                            from: 'i18n',
                            to: 'i18n',
                        },
                        {
                            from: "**.css",
                            to: "[name].css"
                        },
                        {
                            from: "**.json",
                            to: "[name].json"
                        },
                        {
                            from: path.resolve(__dirname, "core/assets/prod_script.js"),
                            to: path.resolve(__dirname, "prod", "script.js")
                        }
                    ],
                })
            ]
        }
    }


}