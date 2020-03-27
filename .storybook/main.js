// const rewireLodash = require('react-app-rewire-lodash');
const overrides = require('../config-overrides.js');
module.exports = {
    stories: ['../src/components/**/*.stories.js'],
    addons: [
        {
          name: '@storybook/preset-create-react-app',
          options: {
            scriptsPackageName: './',
          },
        },
        '/Users/dengshiwei/Documents/AsiaInfo/product/react/.storybook/storybook-addons-iframe/register.js'
        // '@storybook/addon-docs'
        // 'storybook-addon-preview'
    ],
    // webpackFinal: overrides
};
