/* config-overrides.js */

const {
    override,
    addLessLoader,
    addWebpackPlugin,
    addWebpackAlias,
    addBundleVisualizer,
    useBabelRc,
    overrideDevServer,
} = require("customize-cra");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const Es3ifyPlugin = require("es3ify-webpack-plugin");

const webpack = require("webpack");
const {
    iconFontCDNUrl,
    proIconFontDirectory,
    iconfontFileName,
    fetchPrefix,
    useKeepAlive,
    needSupportIE8,
    componentsFolderName,
} = require("./config/config.custom.js");

const path = require("path");
const { paths } = require("react-app-rewired");
const { prepareProxy } = require("./config/proxyUtils.js");

module.exports.webpack = override(
    (config) => {
        // console.log(config.plugins);
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
        // "@ant-design/icons/lib/dist$": path.join(paths.appSrc, "public", "/js/icons.js") // 配置本地图标
        "@rc": "@obc-fe/react-components/esm/" + componentsFolderName,
    }),

    // 启用打包文件分析
    addBundleVisualizer({ analyzerMode: "server" }, true),

    // 添加 less 文件解析
    addLessLoader(),

    // 添加 babelrc 配置
    useBabelRc(),

    // 添加编译进度插件
    addWebpackPlugin(new ProgressBarPlugin()),

    // 原始配置
    (config) => {
        // 变量注入
        config.plugins.unshift(
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
                    FETCH_PREFIX: JSON.stringify(fetchPrefix),
                },
            })
        );

        // 自动识别后缀添加 less 类型
        config.resolve.extensions.push(".less");

        // 按需加载对应组件
        config.module.rules[2].oneOf[1].options.plugins = [
            ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }, "antd"],
            ["import", { libraryName: "antd-mobile", style: "css" }, "antd-mobile"],
            [
                "import",
                {
                    libraryName: "@common",
                    customName: (name) => {
                        let nameToUpperCase = name.replace(/-(\w)/g, function ($0, $1) {
                            return $1.toUpperCase();
                        });
                        return `@common/${nameToUpperCase}/${nameToUpperCase}.jsx`;
                    },
                },
                "@common",
            ],
            // [
            //     "import",
            //     {
            //         libraryName: "@rc",
            //         libraryDirectory: "esm/" + componentsFolderName,
            //         camel2DashComponentName: false,
            //     },
            //     "@rc",
            // ],
        ];

        // less 文件注入公共变量
        config.module.rules[2].oneOf[7].use.push({
            loader: require.resolve("style-resources-loader"),
            options: {
                patterns: [
                    path.join(paths.appSrc, "public", "/style/variables.less"),
                    path.join(paths.appSrc, "public", "/style/mixins.less"),
                ],
            },
        });

        // 组件缓存相关别名设置
        if (useKeepAlive === true) {
            config.resolve.alias["react-router-config"] = path.join(paths.appSrc, "public", "/js/react-router-config.js");
        }

        // 配置模块拆分
        config.optimization.splitChunks = {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux|react-app-polyfill)[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
                commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 3,
                },
            },
        };

        // 支持 IE8 以及一些远古浏览器
        needSupportIE8 && process.env.NODE_ENV === "production" && config.plugins.push(new Es3ifyPlugin());

        // 生产环境代码移除 console
        process.env.NODE_ENV === "production" &&
            config.optimization.minimizer.forEach((item) => {
                item.constructor.name === "TerserPlugin" && (item.options.terserOptions.compress.drop_console = true);
            });

        // iconfont 图标资源加载
        process.env.NODE_ENV === "production" &&
            config.plugins.forEach((plugin) => {
                if (plugin.constructor.name === "InterpolateHtmlPlugin") {
                    plugin.replacements["ICON_FONT_SOUCE"] =
                        iconFontCDNUrl && proIconFontDirectory && iconfontFileName
                            ? `<link rel="stylesheet" href="${proIconFontDirectory}/${iconfontFileName}.css">`
                            : "";
                }
            });

        process.env.NODE_ENV === "development" &&
            config.plugins.forEach((plugin) => {
                if (plugin.constructor.name === "InterpolateHtmlPlugin") {
                    plugin.replacements["ICON_FONT_SOUCE"] = iconFontCDNUrl ? `<link rel="stylesheet" href="${iconFontCDNUrl}">` : "";
                }
            });

        // fix 因 react-script 升级导致的 less 文件打包后，背景 url 地址未指回根目录的问题
        config.module.rules[2].oneOf[7].use[0].options = config.output.publicPath.startsWith(".") ? { publicPath: "../../" } : {};
        config.module.rules[2].oneOf[8].use[0].options = config.output.publicPath.startsWith(".") ? { publicPath: "../../" } : {};

        return config;
    },

    (config) => {
        // 这里只是输出一下配置进行检查
        return config;
    }
);

module.exports.devServer = overrideDevServer(
    // dev server plugin
    (config) => {
        config.proxy = prepareProxy();
        // 这里只是输出一下配置进行检查
        return config;
    }
);

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);

module.exports.paths = function (paths, env) {
    let appBuild = require(resolveApp("package.json")).appBuild;
    appBuild && (paths.appBuild = resolveApp(appBuild));
    return paths;
};
