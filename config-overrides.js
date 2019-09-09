/* config-overrides.js */

const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackPlugin,
    addWebpackAlias,
    addBundleVisualizer,
    useBabelRc
} = require("customize-cra");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const es3ifyPlugin = require("es3ify-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");

const webpack = require("webpack");
const {
    iconFontCDNUrl,
    proIconFontDirectory,
    iconfontFileName,
    fetchPrefix,
    useKeepAlive
} = require("./config/config.custom.js");

const path = require("path");
const { paths } = require("react-app-rewired");

module.exports = override(
    config => {
        // console.log(config.plugins);
        return config;
    },

    // 原始配置
    config => {
        let originEntry = config.entry;
        config.entry = {
            main: [...originEntry],
            vendors: [
                // ...originEntry,
                // require.resolve("@babel/polyfill"),
                // require.resolve("fetch-polyfill"),
                // require.resolve("raf/polyfill"),
                // require.resolve("react"),
                // require.resolve("react-dom"),
                // require.resolve("react-router-dom"),
                // require.resolve("redux"),
                // require.resolve("react-redux"),
                // require.resolve("prop-types"),
                // require.resolve(
                //     path.join(paths.appSrc, "public", "/js/vendor.js")
                // )
                "core-js",
                "regenerator-runtime",
                "fetch-polyfill",
                "raf/polyfill",
                "react",
                "react-dom",
                "react-router-dom",
                "redux",
                "react-redux" // 提取公共资源-1
            ]
        };

        // 变量注入
        config.plugins.unshift(
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(
                        process.env.NODE_ENV || "development"
                    ),
                    FETCH_PREFIX: JSON.stringify(fetchPrefix)
                }
            })
        );

        // 自动识别后缀添加 less 类型
        config.resolve.extensions.push(".less");

        // 按需加载对应组件
        config.module.rules[2].oneOf[1].options.plugins = [
            [
                "import",
                { libraryName: "antd", libraryDirectory: "es", style: "css" },
                "antd"
            ],
            [
                "import",
                {
                    libraryName: "@common",
                    customName: name => {
                        let nameToUpperCase = name.replace(/-(\w)/g, function(
                            $0,
                            $1
                        ) {
                            return $1.toUpperCase();
                        });
                        return `@common/${nameToUpperCase}/${nameToUpperCase}.jsx`;
                    }
                },
                "@common"
            ]
        ];

        // 组件缓存相关别名设置
        if (useKeepAlive === true) {
            config.resolve.alias["react-router-config"] = path.join(paths.appSrc,"public","/js/react-router-config.js");
        }

        // 提取公共资源-2
        config.optimization.splitChunks = {
            chunks: "all",
            name: true,
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    chunks: "initial",
                    minChunks: 2
                }
                // main: {
                //     name: "main",
                //     minChunks: 3
                // }
            }
        };

        process.env.NODE_ENV === "production" &&
            config.plugins.push(new es3ifyPlugin());

        // iconfont 图标资源加载
        process.env.NODE_ENV === "production" &&
            config.plugins.push(
                new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                    ICON_FONT_SOUCE:
                        iconFontCDNUrl &&
                        proIconFontDirectory &&
                        iconfontFileName
                            ? `<link rel="stylesheet" href="${proIconFontDirectory}/${iconfontFileName}.css">`
                            : ""
                })
            );

        process.env.NODE_ENV === "development" &&
            config.plugins.push(
                new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                    ICON_FONT_SOUCE: iconFontCDNUrl
                        ? `<link rel="stylesheet" href="${iconFontCDNUrl}">`
                        : ""
                })
            );

        return config;
    },

    // 添加别名
    addWebpackAlias({
        "@src": path.join(__dirname, "/src"),
        "@router": path.join(__dirname, "/src/router"),
        "@redux": path.join(__dirname, "/src/redux"),
        "@models": path.join(__dirname, "/src/redux/models"),
        "@middleware": path.join(__dirname, "/src/redux/middleware"),
        "@components": path.join(__dirname, "/src/components"),
        "@layout": path.join(__dirname, "/src/components/layout"),
        "@common": path.join(__dirname, "/src/components/common"),
        "@js": path.join(paths.appSrc, "public", "/js"),
        "@style": path.join(paths.appSrc, "public", "/style"),
        "@img": path.join(paths.appSrc, "public", "/img"),
        "@other": path.join(paths.appSrc, "public", "/other"),
        "@ant-design/icons/lib/dist$": path.join(
            paths.appSrc,
            "public",
            "/js/icons.js"
        ) // 配置本地图标
    }),

    // 启用打包文件分析
    addBundleVisualizer({ analyzerMode: "server" }, true),

    // 添加 less 文件解析
    addLessLoader(),

    // 添加 babelrc 配置
    useBabelRc(),

    // antd 组件按需加载
    // fixBabelImports("import", {
    //     libraryName: "antd",
    //     libraryDirectory: "es",
    //     style: "css"
    // }),

    // fixBabelImports("import", {
    //     libraryName: "@common",
    //     customName: name => {
    //         let nameToUpperCase = name.replace(/-(\w)/g, function($0, $1) {
    //             return $1.toUpperCase();
    //         });
    //         return `@common/${nameToUpperCase}/${nameToUpperCase}.jsx`;
    //     }
    // }),

    // antd 图标单独拆分
    // addWebpackModuleRule({
    //     loader: "webpack-ant-icon-loader",
    //     enforce: "pre",
    //     include: [require.resolve("@ant-design/icons/lib/dist")]
    // }),

    // 添加编译进度插件
    addWebpackPlugin(new ProgressBarPlugin()),

    config => {
        // 这里只是输出一下配置进行检查
        // console.log(config.plugins);
        return config;
    }
);
