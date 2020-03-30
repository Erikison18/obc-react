resolve:
   { modules:
      [ 'node_modules',
        '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules' ],
     extensions:
      [ '.web.mjs',
        '.mjs',
        '.web.js',
        '.js',
        '.json',
        '.web.jsx',
        '.jsx',
        '.less' ],
     alias:
      { 'react-native': 'react-native-web',
        '@src': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src',
        '@router': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/router',
        '@redux': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/redux',
        '@models': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/redux/models',
        '@middleware': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/redux/middleware',
        '@components': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/components',
        '@layout': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/components/layout',
        '@common': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/components/common',
        '@js': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/public/js',
        '@style': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/public/style',
        '@img': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/public/img',
        '@other': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/public/other',
        '@ant-design/icons/lib/dist$': '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/public/js/icons.js' },
     plugins:
      [ { apply: [Function: nothing],
          makePlugin: [Function],
          moduleLoader: [Function],
          topLevelLoader: { apply: [Function: nothing] },
          bind: [Function],
          tsLoaderOptions: [Function],
          forkTsCheckerOptions: [Function] },
        ModuleScopePlugin {
          appSrcs: [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/src' ],
          allowedFiles:
           Set {
             '/Users/dengshiwei/Documents/AsiaInfo/product/react/package.json' } } ] },
  resolveLoader: { plugins: [ { apply: [Function: nothing] } ] },



{ extensions: [ '.mjs', '.js', '.jsx', '.json' ],
     modules: [ 'node_modules' ],
     alias:
      { 'babel-runtime/core-js/object/assign': '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_core-js@3.6.4@core-js/es/object/assign.js',
        react: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_react@16.13.1@react',
        'react-dom': '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_react-dom@16.13.1@react-dom' } },




把 storybook的alias合并到过去