module.exports = {
    stories: ['../src/components/**/*.stories.js'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-notes'
    ],
    webpackFinal: async config => {
        // console.log(JSON.stringify(config.module.rules));
        // const rules = config.module.rules.filter(rule => rule.loader === require.resolve('babel-loader'));
        console.log(config.module.rules.length)
        return config;
      }
};
