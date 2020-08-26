const path = require("path");
// const homepage = require('./paths').servedPath;
const homepage = require("react-app-rewired").paths.publicUrlOrPath;
// servedPath 已被并进 publicUrlOrPath 见 👇
// https://github.com/facebook/create-react-app/pull/7259/commits/426a1573c50a7d777ace97d7d0a20e8165094f5f#diff-9b26877ecf8d15b7987c96e5a17502f6

module.exports = {
    //本地开发设置iconfont cdn 地址 注意每次ui修改iconfont后都会生成最新的cdn地址，记得及时替换。
    iconFontCDNUrl: "",

    //发布时iconfont位置
    proIconFontDirectory: path.join(homepage, "/iconfont"),

    //iconfont生成文件名
    iconfontFileName: "iconfont",

    //请求前缀
    fetchPrefix: "",

    //使用路由缓存，这种方案不能使用路由动画
    useKeepAlive: false,

    // 需要支持 IE8 或者远古浏览器? 代价是编译至少慢 10s
    needSupportIE8: true,

    // 项目在 @obc-fe/react-components 组件库里对应的项目文件夹名
    componentsFolderName: "test",

    // 代理的配置，此处的配置优先级高于 package.json 内的配置，且各个代理的优先级从上到下
    // proxySetting: {
    //     "/mytj/api": {
    //         target: "http://10.1.241.102:10020/",
    //         changeOrigin: true,
    //         pathRewrite: { "/mytj/api": "/mytj" },
    //     },
    //     "/": {
    //         target: "http://221.179.129.248:8081/",
    //         changeOrigin: true,
    //     },
    // },
};

/*  useKeepAlive
    1.页面缓存实际上是对我们访问过地址对应的components在页面上进行了display:none和block进行切换。
    2.现在我们路由的切换对模块的作用从加载、卸载变成了显示隐藏，那么对组件的影响则是：再次显示的时候不在触发mount和unmount生命周期钩子。
    3.如果访问的路由包含通配符（如：xxx/yyy/:id）和查询参数（如：xxx/yyy?id=1）并且通配符和查询参数有所改变，其实对于当前页面是需要更新数据的。
    4.所以现在我们需要对该情况路由下受到通配符和查询参数影响的conponents进行改造，在该模块下通过UNSAFE_componentWillReceiveProps进行处理数据的更新。
*/

/*
待新增功能：
1、分发es6版本前端资源
2、reduce index 自动生成
*/
