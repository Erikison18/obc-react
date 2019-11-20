import React, {
    Component
} from 'react';
import {
    HashRouter as Router,
    Link,
    Prompt,
    withRouter
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
import './App.less';
import { renderRoutes, matchRoutes } from 'react-router-config';
import routes from '@router';
import { showLoading, hideLoading} from 'react-redux-loading-bar';
import {getAutoPathPrefix} from "@js/utils.js";

const autoPathPrefix = getAutoPathPrefix();

message.config({
    top: 200,
    maxCount: 1,
});

fetch.default({
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    beforeSend() {

        //排除serviceWorker项
        if(!/^((ht|f)tps?):\/\/[\s\S]+\/[\s\S]+\.[\s\S]+$/.test(this.uri)){
            this.uri = `${autoPathPrefix}${this.uri}`;
        }

    },
    async dataFilter(response) {

        //排除serviceWorker请求文件项
        if(!/^((ht|f)tps?):\/\/[\s\S]+\/[\s\S]+\.[\s\S]+$/.test(response.url)){

            if (response.ok===false) {
                message.error(`网络异常`);
                return {};
            }

            let data = await response.json();

            let {code, message:messageDes} = data;

            //未登录
            // if(code === 5000){
            //     message.error(messageDes);
            //     store.dispatch(actiontor.loginLogOut());
            // }

            if(code !== '9000'){
                message.error(messageDes);
            }

            return data;

        }else{
            return response;
        }

    },
    fail(e) {
        message.error(e.toString());
        return {e};
    }
});

const store = configureStore();

const getConfirmation = (pathname, callback) => {

    store.dispatch(showLoading());

    try{

        let branch = matchRoutes(routes, pathname);
        let componentsPreload = branch.map(({ route, match })=>route.component.preload());

        Promise.all(componentsPreload)
            .then((datas)=>{
                setTimeout(function(){
                    store.dispatch(hideLoading());
                }, 500);
                callback(true);
            });

    }catch(e){
        message.error(e.toString());
        store.dispatch(hideLoading());
        callback(true);
    }

};
// const supportsHistory = 'pushState' in window.history

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Provider store={store}>
                    <div style={{height:'100%'}}>
                        <ProgressBar/>
                        <Router getUserConfirmation={getConfirmation} keyLength={12}>
                            <CatchErrorBoundary>
                                <Prompt message={({pathname})=>pathname}/>
                                <ul>
                                    <li><Link to='/auth/123/workhome/project'>简单的redux例子</Link></li>
                                    <li><Link to='/unauth'>简单的async redux例子</Link></li>
                                    <li><Link to='/complex'>一个稍复杂的例子（redux models包含多个reduce的例子、多个action关联）</Link></li>
                                    <li><Link to='/amap'>amap</Link></li>
                                    <li><Link to='/amap1'>amap1</Link></li>
                                    <li><Link to='/animation'>animation</Link></li>
                                    <li><Link to='/date'>date</Link></li>
                                    <li><Link to='/reselector'>reselector</Link></li>
                                    <li><Link to='/keepAlive/1'>/keepAlive/:1</Link></li>
                                    <li><Link to='/keepAlive/2'>/keepAlive/:2</Link></li>
                                </ul>
                                <Layout/>
                            </CatchErrorBoundary>
                        </Router>
                    </div>
                </Provider>
            </LocaleProvider>
        );
    }
}

@withRouter
class Layout extends Component {
    render(){
        let key = '';
        try{
            key = this.props.location.pathname.match(/^\/[^/]+/)[0];
        }catch(e){
            key = '';
        }
        console.log(key);
        return(

            renderRoutes(routes, this.props, {location:this.props.location})
        );
    }
}

export default App;
