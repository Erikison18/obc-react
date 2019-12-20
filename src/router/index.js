import React from "react";
import { Redirect } from "react-router-dom";
import RouterLoadable from "@common/routerLoadable";

let AuthLayout = RouterLoadable({
    loader: () => import("@components/layout/authLayout/authLayout.jsx")
});

let UnAuthLayout = RouterLoadable({
    loader: () => import("@components/layout/unAuthLayout/unAuthLayout.jsx")
});

let Complex = RouterLoadable({
    loader: () => import("@components/Test/complex/complex.jsx")
});

let WorkHome = RouterLoadable({
    loader: () => import("@components/Test/workHome/workHome.jsx")
});

let Personage = RouterLoadable({
    loader: () => import("@components/Test/workHome/personage/personage.jsx")
});

let Project = RouterLoadable({
    loader: () => import("@components/Test/workHome/project/project.jsx")
});

let AMap = RouterLoadable({
    loader: () => import("@components/Test/aMap/aMap.jsx")
});

let AMap1 = RouterLoadable({
    loader: () => import("@components/Test/aMap/aMap1.jsx")
});

let Animation = RouterLoadable({
    loader: () => import("@components/Test/animation/animation.jsx")
});
let DateC = RouterLoadable({
    loader: () => import("@components/Test/date/date.jsx")
});

let Reselector = RouterLoadable({
    loader: () => import("@components/Test/reselector/reselector.jsx")
});

let KeepAlive = RouterLoadable({
    loader: () => import("@components/Test/keepAlive/keepAlive.jsx")
});

let Hooks = RouterLoadable({
    loader: () => import("@components/Test/hooks")
});

let Index = RouterLoadable({
    loader: () => import("@components/Test/Index")
});

let ErrorComponent = RouterLoadable({
    loader: () => import("@components/common/error")
});

const routes = [
    {
        path: "/auth/:id",
        component: AuthLayout,
        routes: [
            {
                path: "/auth/:id/workhome",
                component: WorkHome,
                routes: [
                    {
                        path: "/auth/:id/workhome/personage",
                        component: Personage,
                        exact: true
                    },
                    {
                        path: "/auth/:id/workhome/project",
                        component: Project,
                        exact: true
                    },
                    {
                        component: props => <Redirect to="/error" />
                    }
                ]
            }
        ]
    },
    {
        path: "/unauth",
        component: UnAuthLayout,
        exact: true
    },
    {
        path: "/complex",
        component: Complex,
        exact: true
    },
    {
        path: "/amap",
        component: AMap,
        exact: true
    },
    {
        path: "/amap1",
        component: AMap1,
        exact: true
    },
    {
        path: "/date",
        component: DateC,
        exact: true
    },
    {
        path: "/animation",
        component: Animation,
        exact: true
    },
    {
        path: "/reselector",
        component: Reselector,
        exact: true
    },
    {
        path: "/hooks",
        component: Hooks,
        exact: true
    },
    {
        path: "/3m",
        component: Index,
        exact: true
    },
    {
        path: "/keepAlive/:id",
        component: KeepAlive,
        exact: true
    },
    {
        path: "/",
        exact: true,
        // component: (props) => <Redirect to='/login'/>
        component: Hooks
    },
    {
        path: "/error",
        exact: true,
        component: ErrorComponent
    },
    {
        component: props => <Redirect to="/error" />
    }
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
