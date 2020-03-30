plugins:
   [ DefinePlugin {
       definitions:
        { 'process.env': { NODE_ENV: '"development"', FETCH_PREFIX: '""' } } },
     HtmlWebpackPlugin {
       options:
        { template: '/Users/dengshiwei/Documents/AsiaInfo/product/react/public/index.html',
          templateContent: false,
          templateParameters: [Function: templateParametersGenerator],
          filename: 'index.html',
          hash: false,
          inject: true,
          compile: true,
          favicon: false,
          minify: 'auto',
          cache: true,
          showErrors: true,
          chunks: 'all',
          excludeChunks: [],
          chunksSortMode: 'auto',
          meta: {},
          base: false,
          title: 'Webpack App',
          xhtml: false },
       childCompilerHash: undefined,
       childCompilationOutputName: undefined,
       assetJson: undefined,
       hash: undefined,
       version: 4 },
     InterpolateHtmlPlugin {
       htmlWebpackPlugin:
        { [Function: HtmlWebpackPlugin]
          version: 4,
          getHooks: [Function: getHtmlWebpackPluginHooks],
          createHtmlTagObject: [Function: createHtmlTagObject] },
       replacements:
        { NODE_ENV: 'development',
          PUBLIC_URL: '',
          WDS_SOCKET_HOST: undefined,
          WDS_SOCKET_PATH: undefined,
          WDS_SOCKET_PORT: undefined } },
     ModuleNotFoundPlugin {
       appPath: '/Users/dengshiwei/Documents/AsiaInfo/product/react',
       yarnLockFile: undefined,
       useYarnCommand: [Function: bound useYarnCommand],
       getRelativePath: [Function: bound getRelativePath],
       prettierError: [Function: bound prettierError] },
     DefinePlugin {
       definitions:
        { 'process.env':
           { NODE_ENV: '"development"',
             PUBLIC_URL: '""',
             WDS_SOCKET_HOST: undefined,
             WDS_SOCKET_PATH: undefined,
             WDS_SOCKET_PORT: undefined } } },
     HotModuleReplacementPlugin {
       options: {},
       multiStep: undefined,
       fullBuildTimeout: 200,
       requestTimeout: 10000 },
     CaseSensitivePathsPlugin {
       options: {},
       logger:
        Console {
          log: [Function: bound consoleCall],
          debug: [Function: bound consoleCall],
          info: [Function: bound consoleCall],
          warn: [Function: bound consoleCall],
          error: [Function: bound consoleCall],
          dir: [Function: bound consoleCall],
          time: [Function: bound consoleCall],
          timeEnd: [Function: bound consoleCall],
          trace: [Function: bound consoleCall],
          assert: [Function: bound consoleCall],
          clear: [Function: bound consoleCall],
          count: [Function: bound consoleCall],
          countReset: [Function: bound countReset],
          group: [Function: bound consoleCall],
          groupCollapsed: [Function: bound consoleCall],
          groupEnd: [Function: bound consoleCall],
          Console: [Function: Console],
          dirxml: [Function: dirxml],
          table: [Function: table],
          markTimeline: [Function: markTimeline],
          profile: [Function: profile],
          profileEnd: [Function: profileEnd],
          timeline: [Function: timeline],
          timelineEnd: [Function: timelineEnd],
          timeStamp: [Function: timeStamp],
          context: [Function: context],
          [Symbol(counts)]: Map {} },
       pathCache: {},
       fsOperations: 0,
       primed: false },
     WatchMissingNodeModulesPlugin {
       nodeModulesPath: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules' },
     ManifestPlugin {
       opts:
        { publicPath: '/',
          basePath: '',
          fileName: 'asset-manifest.json',
          transformExtensions: /^(gz|map)$/i,
          writeToFileEmit: false,
          seed: null,
          filter: null,
          map: null,
          generate: [Function: generate],
          sort: null,
          serialize: [Function: serialize] } },
     IgnorePlugin {
       options: { resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ },
       checkIgnore: [Function: bound checkIgnore] },
     ProgressPlugin {
       profile: false,
       handler: [Function],
       modulesCount: 500,
       showEntries: false,
       showModules: true,
       showActiveModules: true },
     InterpolateHtmlPlugin {
       htmlWebpackPlugin:
        { [Function: HtmlWebpackPlugin]
          version: 4,
          getHooks: [Function: getHtmlWebpackPluginHooks],
          createHtmlTagObject: [Function: createHtmlTagObject] },
       replacements:
        { ICON_FONT_SOUCE: '<link rel="stylesheet" href="//at.alicdn.com/t/font_639300_3fp1riujcg5.css">' } } ],




        -------------------


        plugins:
   [ VirtualModulesPlugin {
       _staticModules:
        { '/Users/dengshiwei/Documents/AsiaInfo/product/react/.storybook/generated-entry.js': '\n              import { configure } from \'@storybook/react\';\n              module._StorybookPreserveDecorators = true;\n\n              configure([require.context(\'../src/components\', true, /^\\.\\/(?:(?:(?!\\.)(?:(?:(?!(?:|\\/)\\.).)*?)\\/)?(?!\\.)(?=.)[^\\/]*?\\.stories\\.js\\/?)$/)\n              ], module);\n            ' } },
     HtmlWebpackPlugin {
       options:
        { template: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules/_@storybook_core@5.3.17@@storybook/core/dist/server/templates/index.ejs',
          templateContent: false,
          templateParameters: [Function: templateParameters],
          filename: 'iframe.html',
          hash: false,
          inject: false,
          scriptLoading: 'blocking',
          compile: true,
          favicon: false,
          minify:
           { collapseWhitespace: true,
             removeComments: true,
             removeRedundantAttributes: true,
             removeScriptTypeAttributes: false,
             removeStyleLinkTypeAttributes: true,
             useShortDoctype: true },
          cache: true,
          showErrors: true,
          chunks: 'all',
          excludeChunks: [],
          chunksSortMode: 'none',
          meta: {},
          base: false,
          title: 'Webpack App',
          xhtml: false,
          alwaysWriteToDisk: true },
       childCompilerHash: undefined,
       childCompilationOutputName: undefined,
       assetJson: undefined,
       hash: undefined,
       version: 4 },
     DefinePlugin {
       definitions:
        { 'process.env':
           { NODE_ENV: '"development"',
             NODE_PATH: '""',
             PUBLIC_URL: '"."',
             PORT: '"8080"' },
          NODE_ENV: '"development"' } },
     WatchMissingNodeModulesPlugin {
       nodeModulesPath: '/Users/dengshiwei/Documents/AsiaInfo/product/react/node_modules' },
     HotModuleReplacementPlugin {
       options: {},
       multiStep: undefined,
       fullBuildTimeout: 200,
       requestTimeout: 10000 },
     CaseSensitivePathsPlugin {
       options: {},
       logger:
        Console {
          log: [Function: bound consoleCall],
          debug: [Function: bound consoleCall],
          info: [Function: bound consoleCall],
          warn: [Function: bound consoleCall],
          error: [Function: bound consoleCall],
          dir: [Function: bound consoleCall],
          time: [Function: bound consoleCall],
          timeEnd: [Function: bound consoleCall],
          trace: [Function: bound consoleCall],
          assert: [Function: bound consoleCall],
          clear: [Function: bound consoleCall],
          count: [Function: bound consoleCall],
          countReset: [Function: bound countReset],
          group: [Function: bound consoleCall],
          groupCollapsed: [Function: bound consoleCall],
          groupEnd: [Function: bound consoleCall],
          Console: [Function: Console],
          dirxml: [Function: dirxml],
          table: [Function: table],
          markTimeline: [Function: markTimeline],
          profile: [Function: profile],
          profileEnd: [Function: profileEnd],
          timeline: [Function: timeline],
          timelineEnd: [Function: timelineEnd],
          timeStamp: [Function: timeStamp],
          context: [Function: context],
          [Symbol(counts)]: Map {} },
       pathCache: {},
       fsOperations: 0,
       primed: false },
     ProgressPlugin {
       profile: false,
       handler: undefined,
       modulesCount: 500,
       showEntries: false,
       showModules: true,
       showActiveModules: true },
     DefinePlugin { definitions: { 'process.env.PORT': '"8080"' } },
     NormalModuleReplacementPlugin { resourceRegExp: /core-js/, newResource: [Function] } ],



     react-app-rewired 

     必要的处理掉 HtmlWebpackPlugin  HotModuleReplacementPlugin(多余) CaseSensitivePathsPlugin(多余) WatchMissingNodeModulesPlugin（多余） ProgressPlugin（多余） 
     疑惑  ModuleNotFoundPlugin（防止用户从src和module以外引入包？）
     非必要处理掉 InterpolateHtmlPlugin