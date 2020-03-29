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

        let baseConfig = overrides.webpack(config(process.env.NODE_ENV), process.env.NODE_ENV)

        baseConfig.entry = storybookConfig.entry;
        baseConfig.output = storybookConfig.output;


        baseConfig.resolve.alias = {
            '@.storybook':path.join(__dirname, './'),
            '@stories':path.join(__dirname, '../stories'),
            '@public':path.join(__dirname, '../public'),
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
            include:[path.join(appPath,'/.storybook/stories')],
            exclude: path.join(appPath,'/public/index.html'),
            use: [{
                loader:'html-loader',
                options:{
                    minimize:false
                }
            }]
        })

        //解决导入html文件中js由于react项目中flie-loader排除js，顾把html example部署到storybook stories中单独配置
        //解决html中引入非stories js资源
        baseConfig.module.rules.push({
            include:function(url){
                //排除loader注入文件
                if(!/node\_modules\/.*?\-loader/.test(url)){
                    return true
                }else{
                    // console.log(url)
                }
            },
            issuer:function(url){
                if(/\.storybook\/stories.+\.html/.test(url)){
                    // console.log(url)
                    return true
                }
            },
            loader:'file-loader',
            options: {
                name: 'static/media/[name].[hash:8].[ext]'
            }
        })


        // console.dir(baseConfig, { depth: null });

        //optimization、保持

        return baseConfig
    }
};

