const { paths } = require('react-app-rewired');
// require normalized overrides
const overrides = require('react-app-rewired/config-overrides');
const config = require(paths.scriptVersion + '/config/webpack.config.js');
// console.log(config);
console.log(overrides.webpack(config(process.env.NODE_ENV), process.env.NODE_ENV));

{ 
  



  
a = { 
  
  
  node:
   { module: 'empty',
     dgram: 'empty',
     dns: 'mock',
     fs: 'empty',
     http2: 'empty',
     net: 'empty',
     tls: 'empty',
     child_process: 'empty' },
  performance: false }