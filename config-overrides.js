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
                '@babel/polyfill','fetch-polyfill',"raf/polyfill",'react','react-dom','react-router-dom','redux','react-redux'
            ]
        };

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
        // paths.moduleFileExtensions.push("less");

        // // 添加 less
        // const arrLength = config.module.rules[2].oneOf.length - 1;
        // config.module.rules[2].oneOf[arrLength].exclude.push(/\.less$/);

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

        if (useKeepAlive === true) {
            config.resolve.alias["react-router-config"] = path.join(paths.appSrc,"public","/js/react-router-config.js");
        }

        config.optimization.splitChunks = {
            chunks: "all",
            name: true,
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    chunks:'initial',
                    minChunks:2,
                },
                // main: {
                //     name: "main",
                //     minChunks: 3
                // }
            }
        };

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

    process.env.NODE_ENV === "production" &&
        addWebpackPlugin(new es3ifyPlugin()),
    process.env.NODE_ENV === "production" &&
        addWebpackPlugin(
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                ICON_FONT_SOUCE:
                    iconFontCDNUrl && proIconFontDirectory && iconfontFileName
                        ? `<link rel="stylesheet" href="${proIconFontDirectory}/${iconfontFileName}.css">`
                        : ""
            })
        ),
    process.env.NODE_ENV === "development" &&
        addWebpackPlugin(
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                REACT_APP_ICON_FONT_SOUCE: iconFontCDNUrl
                    ? `<link rel="stylesheet" href="${iconFontCDNUrl}">`
                    : ""
            })
        ),

    // 添加编译进度插件
    addWebpackPlugin(new ProgressBarPlugin()),

    config => {
        // console.log(config.plugins);
        // console.log(config.resolve.alias);
        return config;
    }
);
