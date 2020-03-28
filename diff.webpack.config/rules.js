
  module:
   { strictExportPresence: true,
     rules:
      [ { parser: { requireEnsure: false } },
        { test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use:
           [ { options:
                { cache: true,
                  formatter: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_react-dev-utils@10.2.1@react-dev-utils/eslintFormatter.js',
                  eslintPath: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_eslint@6.8.0@eslint/lib/api.js',
                  resolvePluginsRelativeTo: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_react-scripts@3.4.1@react-scripts/config',
                  ignore: false,
                  baseConfig:
                   { extends:
                      [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_eslint-config-react-app@5.2.1@eslint-config-react-app/index.js' ] },
                  useEslintrc: false },
               loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_eslint-loader@3.0.3@eslint-loader/dist/cjs.js' } ],
          include: '/Users/dengshiwei/Documents/AsiaInfo/product/react/src' },
        { oneOf:
           [ { test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
               loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_url-loader@2.3.0@url-loader/dist/cjs.js',
               options: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' } },
             { test: /\.(js|mjs|jsx|ts|tsx)$/,
               include: '/Users/dengshiwei/Documents/AsiaInfo/product/react/src',
               loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-loader@8.1.0@babel-loader/lib/index.js',
               options:
                { customize: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-preset-react-app@9.1.2@babel-preset-react-app/webpack-overrides.js',
                  babelrc: true,
                  configFile: false,
                  presets:
                   [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-preset-react-app@9.1.2@babel-preset-react-app/index.js' ],
                  cacheIdentifier: 'development:babel-plugin-named-asset-import@0.3.6:babel-preset-react-app@9.1.2:react-dev-utils@10.2.1:react-scripts@3.4.1',
                  plugins:
                   [ [ 'import',
                       { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
                       'antd' ],
                     [ 'import',
                       { libraryName: '@common', customName: [Function: customName] },
                       '@common' ] ],
                  cacheDirectory: true,
                  cacheCompression: false,
                  compact: false } },
             { test: /\.(js|mjs)$/,
               exclude: /@babel(?:\/|\\{1,2})runtime/,
               loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-loader@8.1.0@babel-loader/lib/index.js',
               options:
                { babelrc: false,
                  configFile: false,
                  compact: false,
                  presets:
                   [ [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-preset-react-app@9.1.2@babel-preset-react-app/dependencies.js',
                       { helpers: true } ] ],
                  cacheDirectory: true,
                  cacheCompression: false,
                  cacheIdentifier: 'development:babel-plugin-named-asset-import@0.3.6:babel-preset-react-app@9.1.2:react-dev-utils@10.2.1:react-scripts@3.4.1',
                  sourceMaps: true,
                  inputSourceMap: true } },
             { test: /\.css$/,
               exclude: /\.module\.css$/,
               use:
                [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-loader@0.23.1@style-loader/index.js',
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_css-loader@3.4.2@css-loader/dist/cjs.js',
                    options: { importLoaders: 1, sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
                    options:
                     { ident: 'postcss',
                       plugins: [Function: plugins],
                       sourceMap: false } } ],
               sideEffects: true },
             { test: /\.module\.css$/,
               use:
                [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-loader@0.23.1@style-loader/index.js',
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_css-loader@3.4.2@css-loader/dist/cjs.js',
                    options:
                     { importLoaders: 1,
                       sourceMap: false,
                       modules: { getLocalIdent: [Function: getLocalIdent] } } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
                    options:
                     { ident: 'postcss',
                       plugins: [Function: plugins],
                       sourceMap: false } } ] },
             { test: /\.(scss|sass)$/,
               exclude: /\.module\.(scss|sass)$/,
               use:
                [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-loader@0.23.1@style-loader/index.js',
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_css-loader@3.4.2@css-loader/dist/cjs.js',
                    options: { importLoaders: 3, sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
                    options:
                     { ident: 'postcss',
                       plugins: [Function: plugins],
                       sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_resolve-url-loader@3.1.1@resolve-url-loader/index.js',
                    options: { sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_sass-loader@8.0.2@sass-loader/dist/cjs.js',
                    options: { sourceMap: true } } ],
               sideEffects: true },
             { test: /\.module\.(scss|sass)$/,
               use:
                [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-loader@0.23.1@style-loader/index.js',
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_css-loader@3.4.2@css-loader/dist/cjs.js',
                    options:
                     { importLoaders: 3,
                       sourceMap: false,
                       modules: { getLocalIdent: [Function: getLocalIdent] } } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
                    options:
                     { ident: 'postcss',
                       plugins: [Function: plugins],
                       sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_resolve-url-loader@3.1.1@resolve-url-loader/index.js',
                    options: { sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_sass-loader@8.0.2@sass-loader/dist/cjs.js',
                    options: { sourceMap: true } } ] },
             { test: /\.less$/,
               exclude: /\.module\.less$/,
               use:
                [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-loader@1.1.3@style-loader/dist/cjs.js',
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_css-loader@3.4.2@css-loader/dist/cjs.js',
                    options: { importLoaders: 2 } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
                    options:
                     { ident: 'postcss',
                       plugins: [Function: plugins],
                       sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js',
                    options: { source: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-resources-loader@1.3.3@style-resources-loader/lib/index.js',
                    options:
                     { patterns:
                        [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/public/style/variables.less',
                          '/Users/dengshiwei/Documents/AsiaInfo/product/react/src/public/style/mixins.less' ] } } ],
               sideEffects: false },
             { test: /\.module\.less$/,
               use:
                [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-loader@1.1.3@style-loader/dist/cjs.js',
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_css-loader@3.4.2@css-loader/dist/cjs.js',
                    options:
                     { importLoaders: 2,
                       modules: true,
                       localIdentName: '[path][name]__[local]--[hash:base64:5]' } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
                    options:
                     { ident: 'postcss',
                       plugins: [Function: plugins],
                       sourceMap: false } },
                  { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js',
                    options: { source: false } } ] },
             { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_file-loader@4.3.0@file-loader/dist/cjs.js',
               exclude: [ /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/ ],
               options: { name: 'static/media/[name].[hash:8].[ext]' } } ] } ] },
   // { test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
   //        loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_file-loader@4.3.0@file-loader/dist/cjs.js',
   //        query: { name: 'static/media/[name].[hash:8].[ext]' } },

  module:
   { rules:
      [ { test: /\.(mjs|jsx?)$/,
          use:
           [ { loader: 'babel-loader',
               options:
                { cacheDirectory: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/.cache/storybook',
                  presets:
                   [ [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@babel_preset-env@7.9.0@@babel/preset-env/lib/index.js',
                       { shippedProposals: true, useBuiltIns: 'usage', corejs: '3' } ],
                     '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@babel_preset-react@7.9.4@@babel/preset-react/lib/index.js',
                     '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@babel_preset-flow@7.9.0@@babel/preset-flow/lib/index.js' ],
                  plugins:
                   [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@babel_plugin-proposal-object-rest-spread@7.9.0@@babel/plugin-proposal-object-rest-spread/lib/index.js',
                     '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@babel_plugin-proposal-class-properties@7.8.3@@babel/plugin-proposal-class-properties/lib/index.js',
                     '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@babel_plugin-syntax-dynamic-import@7.8.3@@babel/plugin-syntax-dynamic-import/lib/index.js',
                     [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-plugin-emotion@10.0.29@babel-plugin-emotion/dist/babel-plugin-emotion.cjs.js',
                       { sourceMap: true, autoLabel: true } ],
                     '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-plugin-macros@2.8.0@babel-plugin-macros/dist/index.js',
                     '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@babel_plugin-transform-react-constant-elements@7.9.0@@babel/plugin-transform-react-constant-elements/lib/index.js',
                     '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-plugin-add-react-displayname@0.0.5@babel-plugin-add-react-displayname/index.js',
                     [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_babel-plugin-react-docgen@4.1.0@babel-plugin-react-docgen/lib/index.js',
                       { DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES' } ] ] } } ],
          include: [ '/Users/dengshiwei/Documents/AsiaInfo/product/react' ],
          exclude:
           [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules' ] },
        { test: /\.md$/,
          use:
           [ { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js' } ] },
        { test: /\.css$/,
          sideEffects: true,
          use:
           [ '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_style-loader@1.1.3@style-loader/dist/cjs.js',
             { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_css-loader@3.4.2@css-loader/dist/cjs.js',
               options: { importLoaders: 1 } },
             { loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
               options: { ident: 'postcss', postcss: {}, plugins: [Function: plugins] } } ] },
        { test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
          loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_file-loader@4.3.0@file-loader/dist/cjs.js',
          query: { name: 'static/media/[name].[hash:8].[ext]' } },
        { test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          loader: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_url-loader@2.3.0@url-loader/dist/cjs.js',
          query: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' } } ] },


storybook 多了.md 先全部覆盖试试
