const { paths } = require('react-app-rewired');
const overrides = require('react-app-rewired/config-overrides');
const config = require(paths.scriptVersion + '/config/webpack.config.js');
const path = require('path');

const appPath = path.join(__dirname,'../');

module.exports = {
    stories: ['../src/components/common/button/button.stories.js'],
    addons: [
        // {
        //   name: '@storybook/preset-create-react-app',
        //   // options: {
        //   //   scriptsPackageName: 'react-app-rewired',
        //   // },
        // },
        path.join(appPath,'/.storybook/storybook-addons-iframe/register.js'),
        // '@storybook/addon-docs'
        // 'storybook-addon-preview'
    ],
    webpackFinal: async function(storybookConfig){
        console.dir(storybookConfig.module.rules, { depth: null });

        let baseConfig = overrides.webpack(config(process.env.NODE_ENV), process.env.NODE_ENV)

        baseConfig.entry = storybookConfig.entry;
        baseConfig.output = storybookConfig.output;
        // baseConfig.output.publicPath = '/'

        baseConfig.resolve.alias = {
            ...baseConfig.resolve.alias,
            ...storybookConfig.resolve.alias
        }

        baseConfig.resolve.plugins = baseConfig.resolve.plugins.filter(plugin => {
            return !(
                plugin.constructor.name === 'ModuleScopePlugin'
            )
        })

        baseConfig.plugins = baseConfig.plugins.filter(plugin => {
            return !(
                plugin.constructor.name === 'HtmlWebpackPlugin'||
                plugin.constructor.name === 'HotModuleReplacementPlugin'||
                plugin.constructor.name === 'CaseSensitivePathsPlugin'||
                plugin.constructor.name === 'WatchMissingNodeModulesPlugin'||
                plugin.constructor.name === 'ProgressPlugin'||
                plugin.constructor.name === 'InterpolateHtmlPlugin'
            )
        });

        storybookConfig.plugins.push(...baseConfig.plugins);

        baseConfig.plugins = storybookConfig.plugins;



        baseConfig.module.rules.map((item)=>{

            if(item.include === path.join(appPath,'/src')) {
                item.include = [path.join(appPath,'/src'),path.join(appPath,'/.storybook')];
            }
            if(item.include instanceof Array && item.include.includes(path.join(appPath,'/src'))) {
                item.include.push(path.join(appPath,'/.storybook'))
            }

            return item
        });

        baseConfig.module.rules[2].oneOf.map((item)=>{

            if(item.include === path.join(appPath,'/src')) {
                item.include = [path.join(appPath,'/src'),path.join(appPath,'/.storybook')];
            }
            if(item.include instanceof Array && item.include.includes(path.join(appPath,'/src'))) {
                item.include.push(path.join(appPath,'/.storybook'))
            }

            return item
        })

        //处理ejs文件问题
        baseConfig.module.rules[2].oneOf.map((item)=>{
            if(item.loader&&/file\-loader/.test(item.loader)) item.exclude = [ /\.(ejs|js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/ ];
            return item
        })

        baseConfig.module.rules.push({
            test: /\.(md)$/,
            use: 'raw-loader'
        });

        baseConfig.module.rules.push({
            test: /\.(html)$/,
            include:[path.join(appPath,'/src')],
            exclude: path.join(appPath,'/public/index.html'),
            use: [
            // // {
            // //     loader:'file-loader?name=[name].[ext]',

            // // },
            // {
            //     loader:'extract-loader',

            // },
            {
                loader:'html-loader',
                // options: {
                //     attrs: ['script:src']
                // }
            }]
        })


        // console.dir(baseConfig, { depth: null });

        //optimization、保持

        return baseConfig
    }
};

