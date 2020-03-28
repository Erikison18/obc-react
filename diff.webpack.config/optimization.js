optimization:
   { minimize: false,
     minimizer:
      [ TerserPlugin {
          options:
           { test: /\.m?js(\?.*)?$/i,
             chunkFilter: [Function: chunkFilter],
             warningsFilter: [Function: warningsFilter],
             extractComments: true,
             sourceMap: true,
             cache: true,
             cacheKeys: [Function: cacheKeys],
             parallel: true,
             include: undefined,
             exclude: undefined,
             minify: undefined,
             terserOptions:
              { parse: { ecma: 8 },
                compress: { ecma: 5, warnings: false, comparisons: false, inline: 2 },
                mangle: { safari10: true },
                keep_classnames: false,
                keep_fnames: false,
                output: { ecma: 5, comments: false, ascii_only: true } } } },
        OptimizeCssAssetsWebpackPlugin {
          pluginDescriptor: { name: 'OptimizeCssAssetsWebpackPlugin' },
          options:
           { assetProcessors:
              [ { phase: 'compilation.optimize-chunk-assets',
                  regExp: /\.css(\?.*)?$/i,
                  processor: [Function: processor] } ],
             canPrint: undefined,
             assetNameRegExp: /\.css(\?.*)?$/i,
             cssProcessor: { [Function: creator] process: [Function] },
             cssProcessorOptions:
              { parser: [Function: safeParse],
                map: { inline: false, annotation: true } },
             cssProcessorPluginOptions:
              { preset: [ 'default', { minifyFontValues: { removeQuotes: false } } ] } },
          phaseAssetProcessors:
           { 'compilation.optimize-chunk-assets':
              [ { phase: 'compilation.optimize-chunk-assets',
                  regExp: /\.css(\?.*)?$/i,
                  processor: [Function: processor] } ],
             'compilation.optimize-assets': [],
             emit: [] },
          deleteAssetsMap: {} } ],
     splitChunks:
      { chunks: 'all',
        name: true,
        cacheGroups:
         { vendors: { name: 'vendors', chunks: 'initial', minChunks: 2 },
           commons: { name: 'commons', chunks: 'all', minChunks: 3 } } },
     runtimeChunk: { name: [Function: name] } },
  ----------------------


  optimization:
   { splitChunks: { chunks: 'all' },
     runtimeChunk: true,
     minimizer:
      [ TerserPlugin {
          options:
           { test: /\.m?js(\?.*)?$/i,
             chunkFilter: [Function: chunkFilter],
             warningsFilter: [Function: warningsFilter],
             extractComments: true,
             sourceMap: true,
             cache: true,
             cacheKeys: [Function: cacheKeys],
             parallel: true,
             include: undefined,
             exclude: undefined,
             minify: undefined,
             terserOptions: { mangle: false, keep_fnames: true } } } ] },
  performance: { hints: false } }Animation


  直接使用react-app-rewired的