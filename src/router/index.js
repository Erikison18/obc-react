import React from "react";
import { Redirect } from "react-router-dom";
import RouterLoadable from "@common/routerLoadable";

import testRouteArr from "./testRoutes";

let Hooks = RouterLoadable({
    loader: () => import("@components/Test/hooks"),
});

let ErrorComponent = RouterLoadable({
    loader: () => import("@components/common/error"),
});

const routes = [
    // 注释或删除 testRouteArr 即可去除项目所有用于测试的页面路由
    ...testRouteArr,
    {
        path: "/",
        exact: true,
        // component: (props) => <Redirect to='/login'/>
        component: Hooks,
    },
    {
        path: "/error",
        exact: true,
        component: ErrorComponent,
    },
    {
        component: (props) => <Redirect to="/error" />,
    },
];

// if(process.env.NODE_ENV!=='production') {
//     let Demo = RouterLoadable({
//         loader: () =>
//             import ('@components/demo/demo.jsx'),
//     });
//     routes.unshift({
//         path: '/demo',
//         exact: true,
//         component: Demo
//     })
// }

export default routes;
