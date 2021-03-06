import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import CatchErrorBoundary from "@common/catchErrorBoundary";

@withRouter
export default class AuthLayout extends Component {
    constructor(props, ...args) {
        super(props, ...args);
        // props.cacheLifecycles.didCache(this.componentDidCache)
        // props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    componentDidMount() {
        //action
    }

    componentDidCache() {
        console.log("List cached");
    }

    componentDidRecover() {
        console.log("List recovered");
    }

    componentWillReceiveProps(nextProps) {
        console.log("keepAlive");
        if (
            nextProps.location.search !== this.props.location.search ||
            JSON.stringify(nextProps.match.params) !== JSON.stringify(this.props.match.params)
        ) {
            /*
                1.页面缓存实际上是对我们访问过地址对应的components在页面上进行了display:none和block进行切换。
                2.现在我们路由的切换对模块的作用从加载、卸载变成了显示隐藏，那么对组件的影响则是：再次显示的时候不在触发mount和unmount生命周期钩子。
                3.如果访问的路由包含通配符（如：xxx/yyy/:id）和查询参数（如：xxx/yyy?id=1）并且通配符和查询参数有所改变，其实对于当前页面是需要更新数据的。
                4.所以现在我们需要对该情况路由下受到通配符和查询参数影响的conponents进行改造，在该模块下通过componentWillReceiveProps进行处理数据的更新。
            */
            console.log("action");
        }
    }

    render() {
        return <CatchErrorBoundary>1</CatchErrorBoundary>;
    }
}
