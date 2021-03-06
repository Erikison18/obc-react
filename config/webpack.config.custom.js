const path = require('path');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const webpack = require('webpack');
const paths = require('./paths');
const url = require('url');
const {iconFontCDNUrl, proIconFontDirectory, iconfontFileName, fetchPrefix, useKeepAlive} = require('./config.custom.js');
// const { ReactLoadablePlugin } = require('react-loadable/webpack');
// const HappyPack = require('happypack');
// const os = require('os');
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function common(config) {

    /*
    entry
    */

    let originEntry = config.entry;

    config.entry = {
        main: [
            ...originEntry.splice(1)
        ],
        vendors: [
            // ...originEntry,
            require.resolve('babel-polyfill'),
            require.resolve('fetch-polyfill'),
            require.resolve('raf/polyfill'),
            require.resolve('react'),
            require.resolve('react-dom'),
            require.resolve('react-router-dom'),
            require.resolve('redux'),
            require.resolve('react-redux'),
            require.resolve('prop-types'),
            require.resolve(path.join(paths.appSrc, 'public', '/js/vendor.js'))
        ]
    };

    /*
    alias
    */
    config.resolve.alias['@src'] = path.join(__dirname, '../src');
    config.resolve.alias['@router'] = path.join(__dirname, '../src/router');
    config.resolve.alias['@redux'] = path.join(__dirname, '../src/redux');
    config.resolve.alias['@models'] = path.join(__dirname, '../src/redux/models');
    config.resolve.alias['@middleware'] = path.join(__dirname, '../src/redux/middleware');
    config.resolve.alias['@components'] = path.join(__dirname, '../src/components');
    config.resolve.alias['@layout'] = path.join(__dirname, '../src/components/layout');
    config.resolve.alias['@common'] = path.join(__dirname, '../src/components/common');
    config.resolve.alias['@js'] = path.join(paths.appSrc, 'public', '/js');
    config.resolve.alias['@style'] = path.join(paths.appSrc, 'public', '/style');
    config.resolve.alias['@img'] = path.join(paths.appSrc, 'public', '/img');
    config.resolve.alias['@other'] = path.join(paths.appSrc, 'public', '/other');
    //????????????antd icons ???????????????
    config.resolve.alias['@ant-design/icons/lib/dist$'] = path.join(paths.appSrc, 'public', '/js/icons.js');
    //??????react-router-config ??????react-router-cache-route ??????router????????????
    if(useKeepAlive===true)config.resolve.alias['react-router-config'] = path.join(paths.appSrc, 'public', '/js/react-router-config.js');

    /*
    extensions
    */
    config.resolve.extensions.push('less');

    /*
    loader
    */
    config.module.rules[1].oneOf[3].exclude.push(/\.less$/);

    //?????????????????????
    config.module.rules[1].oneOf[1].options.plugins = [
        [
            "import",
            [
                { "libraryName": "antd", "libraryDirectory": "es", "style": "css" },
                { "libraryName": "@common",
                    "customName": (name) => {
                        let nameToUpperCase = name.replace(/-(\w)/g, function ($0, $1){
                            return $1.toUpperCase();
                        });
                        return `@common/${nameToUpperCase}/${nameToUpperCase}.jsx`;
                    }
                }
            ]
        ]
    ];


    /*
    plugin
    */

    config.plugins.unshift(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV : JSON.stringify(process.env.NODE_ENV || 'development'),
            FETCH_PREFIX: JSON.stringify(fetchPrefix)
        }
    }));

    return config;

}

exports.dev = function(config) {

    config = common(config);

    /*
    output
    */
    config.output.filename = 'static/js/[name].js';

    //??????less-loader
    config.module.rules[1].oneOf.push({
        test: /\.less$/,
        use: [
            require.resolve('style-loader'), {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                },
            }, {
                loader: require.resolve('postcss-loader'),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                        })
                    ]
                }
            }, {
                loader: require.resolve('less-loader'),
            }, {
                loader: require.resolve('style-resources-loader'),
                options: {
                    patterns: [
                        path.join(paths.appSrc, 'public', '/style/variables.less'),
                        path.join(paths.appSrc, 'public', '/style/mixins.less'),
                    ]
                }
            }
        ]
    });

    /*plugin*/
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: path.join('static/js/[name].js')
    }));
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }));

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        async: 'vendor-async',
        children: true,
        minChunks: 3
    }));
    //iconfont??????
    config.plugins.push(new InterpolateHtmlPlugin({
        ICON_FONT_SOUCE:iconFontCDNUrl?`<link rel="stylesheet" href="${iconFontCDNUrl}">`:''
    }));

    // config.module.rules.push({
    //     test: /\.less$/,
    //     //??????.js ?????????????????????id???happyBabel ???HappyPack ???????????????
    //     loader: 'happypack/loader?id=happyLess',
    //     //??????node_modules ??????????????????
    //     exclude: /node_modules/
    // });

    // config.plugins.push(new HappyPack({
    //     //???id????????? happypack?????????????????????
    //   id: 'happyLess',
    //   //????????????  ?????????loader ???????????????
    //         loaders: [{
    //             test: /\.less$/,
    //             include: paths.appSrc,
    //             loader: 'less-loader'
    //         }],
    //   //???????????????
    //   threadPool: happyThreadPool,
    //   //?????? HappyPack ????????????
    //   verbose: true,
    // }))

    // config.module.rules.push({
    //     test: /\.css$/,
    //     //??????.js ?????????????????????id???happyBabel ???HappyPack ???????????????
    //     loader: 'happypack/loader?id=happyCss',
    //     //??????node_modules ??????????????????
    //     exclude: /node_modules/
    // });


    // config.plugins.push(new HappyPack({
    //     //???id????????? happypack?????????????????????
    //   id: 'happyCss',
    //   //????????????  ?????????loader ???????????????
    //         loaders: [{
    //             test: /\.css$/,
    //             include: paths.appSrc,
    //             loader: 'css-loader',
    //             options: {
    //                 importLoaders: 1,
    //             },
    //         }],
    //   //???????????????
    //   threadPool: happyThreadPool,
    //   //?????? HappyPack ????????????
    //   verbose: true,
    // }))


    // config.plugins.push(new HappyPack({
    //     //???id????????? happypack?????????????????????
    //   id: 'happyStyle',
    //   //????????????  ?????????loader ???????????????
    //         loaders: [{
    //             test: /\.css$/,
    //             include: paths.appSrc,
    //             loader: 'style-loader'
    //         }],
    //   //???????????????
    //   threadPool: happyThreadPool,
    //   //?????? HappyPack ????????????
    //   verbose: true,
    // }))



    // config.module.rules.push({
    //     test: /\.css$/,
    //     //??????.js ?????????????????????id???happyBabel ???HappyPack ???????????????
    //     loader: 'happypack/loader?id=happyStyle',
    //     //??????node_modules ??????????????????
    //     exclude: /node_modules/
    // });


    // config.plugins.push(new HappyPack({
    //     //???id????????? happypack?????????????????????
    //   id: 'happyCss',
    //   //????????????  ?????????loader ???????????????
    //         loaders: [{
    //             test: /\.css$/,
    //             include: paths.appSrc,
    //             loader: 'style-loader'
    //         }],
    //   //???????????????
    //   threadPool: happyThreadPool,
    //   //?????? HappyPack ????????????
    //   verbose: true,
    // }))


    // config.module.rules.push({
    //     test: /\.(js|jsx|mjs)$/,
    //     //??????.js ?????????????????????id???happyBabel ???HappyPack ???????????????
    //     loader: 'happypack/loader?id=happyBabel',
    //     //??????node_modules ??????????????????
    //     exclude: /node_modules/
    // });

    // config.plugins.push(new HappyPack({
    //     //???id????????? happypack?????????????????????
    //   id: 'happyBabel',
    //   //????????????  ?????????loader ???????????????
    //         loaders: [{
    //             test: /\.(js|jsx|mjs)$/,
    //             include: paths.appSrc,
    //             loader: 'babel-loader',
    //             options: {

    //                 // This is a feature of `babel-loader` for webpack (not Babel itself).
    //                 // It enables caching results in ./node_modules/.cache/babel-loader/
    //                 // directory for faster rebuilds.
    //                 cacheDirectory: true
    //             },
    //         }],
    //   //???????????????
    //   threadPool: happyThreadPool,
    //   //?????? HappyPack ????????????
    //   verbose: true,
    // }))

    //??????ie??????
    // config.module.rules.push({
    //     test: /.js$/,
    //     enforce: 'post', // post-loader??????
    //     loader: 'es3ify-loader'
    // });
    // config.plugins.push(new es3ifyPlugin());

    return config;

};

exports.prod = function(config, {
    shouldUseSourceMap,
    extractTextPluginOptions,
    cssFilename
}) {
    config = common(config);

    //??????polyfill
    // config.entry.vendors.unshift(require.resolve('babel-polyfill'));
    // config.entry.vendors.unshift(require.resolve('raf/polyfill'));

    //????????????iconfont
    // if(iconFontCDNUrl && proIconFontDirectory && iconfontFileName)
    //     config.entry.vendors.unshift(require.resolve(`${proIconFontDirectory}/${iconfontFileName}.css`));

    config.module.rules[1].oneOf.push({
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
            Object.assign({
                fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                        hmr: false,
                    },
                },
                use: [{
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                    },
                }, {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },
                }, {
                    loader: require.resolve('less-loader')
                }, {
                    loader: require.resolve('style-resources-loader'),
                    options: {
                        patterns: [
                            path.join(paths.appSrc, 'public', '/style/variables.less'),
                            path.join(paths.appSrc, 'public', '/style/mixins.less'),
                        ]
                    }
                }]
            }, extractTextPluginOptions)
        )
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
    });



    // {
    //       name: 'vendor',
    //       minChunks (module) {
    //         // any required modules inside node_modules are extracted to vendor
    //         return (
    //           module.resource &&
    //           /\.js$/.test(module.resource) &&
    //           module.resource.indexOf(
    //             path.join(__dirname, '../node_modules')
    //           ) === 0
    //         )
    //       }
    //     }

    //plugins
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: path.join('static/js/[name].[chunkhash:8].js')
    }));

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }));

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        async: 'vendor-async',
        children: true,
        minChunks: 3
    }));

    config.plugins.push(new InterpolateHtmlPlugin({
        ICON_FONT_SOUCE:iconFontCDNUrl&&proIconFontDirectory&&iconfontFileName?`<link rel="stylesheet" href="${proIconFontDirectory}/${iconfontFileName}.css">`:''
    }));

    if(process.argv.includes('--npm_config_report=true'))
        config.plugins.push(new BundleAnalyzerPlugin({openAnalyzer: true}));

    config.plugins.push(new es3ifyPlugin());

    if(config.plugins[5] instanceof ExtractTextPlugin){
        config.plugins[5]=new ExtractTextPlugin({
            filename:cssFilename,
            allChunks: true
        });
    }else{
        console.error('ExtractTextPlugin fail!');
    }

    //     config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/));
    // config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/,/zh-cn/));
    return config;
};



