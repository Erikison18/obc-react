const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const { paths } = require("react-app-rewired");
const { proxySetting } = require("./config.custom.js");

// 检查是否为本地静态文件而决定代理
function mayProxy(pathname) {
    const maybePublicPath = path.resolve(paths.appPublic, pathname.slice(1));
    return !fs.existsSync(maybePublicPath);
}

// 处理代理错误的函数
function onProxyError(proxy) {
    return (err, req, res) => {
        const host = req.headers && req.headers.host;
        console.log(
            chalk.red("Proxy error:") +
                " Could not proxy request " +
                chalk.cyan(req.url) +
                " from " +
                chalk.cyan(host) +
                " to " +
                chalk.cyan(proxy) +
                "."
        );
        console.log(
            "See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (" + chalk.cyan(err.code) + ")."
        );
        console.log();

        // And immediately send the proper error response to the client.
        // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
        if (res.writeHead && !res.headersSent) {
            res.writeHead(500);
        }
        res.end("Proxy error: Could not proxy request " + req.url + " from " + host + " to " + proxy + " (" + err.code + ").");
    };
}

// 生成代理配置的函数
function prepareProxy() {
    let packageJsonTarget = require(paths.appPackageJson).proxy;

    // 若两处配置都无有效值，则返回 undefined
    if (!packageJsonTarget && !proxySetting) {
        return undefined;
    }

    let proxy = proxySetting || { "/": { target: packageJsonTarget, changeOrigin: true } };

    return Object.keys(proxy).map(function (context) {
        if (!proxy[context].hasOwnProperty("target")) {
            console.log(chalk.red("代理请正确设置代理目标 target !"));
            process.exit(1);
        }
        let target = proxy[context].target;
        return Object.assign({}, proxy[context], {
            context: function (pathname) {
                return mayProxy(pathname) && pathname.match(context);
            },
            onProxyReq: (proxyReq) => {
                if (proxyReq.getHeader("origin")) {
                    proxyReq.setHeader("origin", target);
                }
            },
            target,
            onError: onProxyError(target),
        });
    });
}

module.exports = {
    prepareProxy,
};
