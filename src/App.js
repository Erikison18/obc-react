import React, {
    Component
} from 'react';

import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
    Link
} from 'react-router-dom';

import {
    Provider
} from 'react-redux';

import {
    LocaleProvider,
    message
} from 'antd';
import 'moment/locale/zh-cn';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import configureStore from './redux/createStore.js';
import ProgressBar from '@common/progressBar';
/*
*错误边界捕获
*每个拥有router或者子router的位置都得包裹一个错误边界捕获的组件，防止整个应用垮掉或带来的风险操作
*/
import CatchErrorBoundary from '@common/catchErrorBoundary';
/*
*懒加载模块components
*/
import RouterLoadable from '@common/routerLoadable';
import './App.less';

let AuthLayout = RouterLoadable({
    loader: () =>
        import ('@components/layout/authLayout/authLayout.jsx'),
});

let UnAuthLayout = RouterLoadable({
    loader: () =>
        import ('@components/layout/unAuthLayout/unAuthLayout.jsx'),
});

let Complex = RouterLoadable({
    loader: () =>
        import ('@components/layout/complex/complex.jsx'),
});

let ErrorComponent = RouterLoadable({
     loader: () =>
        import ('@components/common/error'),
});

fetch.default({
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': ' application/json',
    },
    beforeSend() {
        //排除serviceWorker项
        if (!/http:\/\//.test(this.uri)&&process.env.HOME_PAGE) this.uri = `${process.env.FETCH_PREFIX}${this.uri}`;
    },
    async dataFilter(response) {

        //排除serviceWorker请求文件项
        if(!/^((ht|f)tps?):\/\/[\s\S]+\/[\s\S]+\.[\s\S]+$/.test(response.url)){

            if (!response.ok) {
                message.error(`${response.status}\n${response.statusText}`);
                return {}
            }

            let data = await response.json();

            let {code,message:messageDes,messageBody} = data;

            //未登录
            // if(code === 5000){
            //     message.error(messageDes);
            //     store.dispatch(actiontor.loginFlag(false));
            // }

            if(code !== '9000'){
                message.error(messageDes);
            }

            return data;

        }else{
            return response
        }

    },
    fail(e) {
        message.error(e.toString());
        return e
    }
});

const store = configureStore();

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Provider store={store}>
                    <div style={{height:'100%'}}>
                        <ProgressBar/>
                        <Router>
                            <CatchErrorBoundary>
                                <ul>
                                    <li><Link to='/'>简单的redux例子</Link></li>
                                    <li><Link to='/unauth'>简单的async redux例子</Link></li>
                                    <li><Link to='/complex'>一个稍复杂的例子（redux models包含多个reduce的例子、多个action关联）</Link></li>
                                </ul>

                                <Switch>
                                    <Route path='/' exact={true} component={AuthLayout} />
                                    <Route path='/unauth' component={UnAuthLayout}/>
                                    <Route path='/complex' component={Complex} />
                                    <Route path='/error' exact={true} component={ErrorComponent}/>
                                    <Redirect to='/error'/>
                                </Switch>
                            </CatchErrorBoundary>
                        </Router>
                    </div>
                </Provider>
            </LocaleProvider>
        );
    }
}

export default App;