{
  "name": "obc-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build && node config/downloadIconFontFile.js",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject",
    "lint": "eslint --fix --ext .jsx --ext .js src/",
    "analyze": "react-app-rewired build --analyze",
    "storybook": "start-storybook -p 9009 -s public",
    "build-storybook": "rm -rf ./storybook-static && build-storybook -s public"
  },
  "bin": {
    "qcc": "config/createComponent.js"
  },
  "dependencies": {
    "@obc-fe/react-components": "^0.1.14",
    "antd": "^{{{antdVersion}}}",
    "antd-mobile": "^2.3.1",
    "fetch-polyfill": "^0.8.2",
    "g": "^2.0.1",
    "less": "^3.10.3",
    "prop-types": "^15.7.2",
    "raf": "^3.4.1",
    "rc-tween-one": "^2.6.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-loadable": "^5.5.0",
    "react-redux": "^7.1.1",
    "react-redux-loading-bar": "^4.4.0",
    "react-router-cache-route": "^1.5.0",
    "react-router-config": "^5.0.1",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.4.1",
    "react-transition-group": "^4.2.2",
    "redux": "^4.0.4",
    "redux-actions": "^2.6.5",
    "redux-localstorage-simple": "^2.1.6",
    "redux-logger": "^3.0.6",
    "redux-promise-middleware": "^5.1.1",
    "reselect": "^4.0.0"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-decorators": "^7.4.4",
    "@babel/plugin-proposal-export-default-from": "^7.5.2",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "@storybook/addon-actions": "^5.3.18",
    "@storybook/addon-console": "^1.2.1",
    "@storybook/addon-info": "^5.3.17",
    "@storybook/addon-links": "^5.3.17",
    "@storybook/addon-notes": "^5.3.17",
    "@storybook/addon-storysource": "^5.3.18",
    "@storybook/addons": "^5.3.17",
    "@storybook/preset-create-react-app": "^2.1.0",
    "@storybook/react": "^5.3.17",
    "@storybook/source-loader": "^5.3.17",
    "babel-plugin-import": "^1.13.0",
    "babel-plugin-react-docgen": "^4.1.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.5",
    "customize-cra": "^0.9.1",
    "es3ify-webpack-plugin": "^0.1.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-prettier": "^3.1.4",
    "html-loader": "^1.0.0",
    "html-webpack-plugin": "^4.0.0-beta.5",
    "husky": "^4.2.5",
    "less-loader": "^5.0.0",
    "lint-staged": "^10.2.2",
    "prettier": "^2.0.5",
    "progress-bar-webpack-plugin": "^1.12.1",
    "react-app-rewire-lodash": "^2.0.0",
    "react-app-rewired": "^2.1.6",
    "storybook-addon-html-document": "^1.0.0",
    "storybook-addon-preview": "^1.0.3",
    "strip-indent": "^3.0.0",
    "style-resources-loader": "^1.3.3",
    "webpack-ant-icon-loader": "^1.0.8",
    "webpack-bundle-analyzer": "^3.4.1"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npx lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,less,css,md}": [
      "prettier --write",
      "git add"
    ]
  },
  "proxy": "http://10.1.241.102:8090/gajpt/",
  "homepage": "./",
  "appBuild": ""
}
