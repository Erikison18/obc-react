// reduce-reducers 可以用于同时触发不同reduce
// import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

//一个假的异步
function request(num=1){

    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(num);
        },1000)
    })

}

//第一步，申明action 传入的属性key就是action type，并导出action
/****重点：定义action type格式为filename_key，防止重复定义引起的不可预估的错误。使用时redux-action会将它转换成驼峰形式。*****/
export const actiontor = createActions({
    complex_reduce:(payload) => request(-payload),
    complex_add(payload){//如果我们需要结合其它action做操作
        return async function (dispatch){
            dispatch(actiontor.complexLoadingStatus(true));
            let res =  await request(payload);
            dispatch(actiontor.complexLoadingStatus(false));
            return res
        }
    },
    complex_loading_status:(payload) => payload
});

//第二步，reducer 会被对应属性key的action 触发
const counts = handleActions({
    complex_reduce: (state, action) => state + action.payload,
    complex_add: (state, action) => state + action.payload
}, 0);//默认值

const loading = handleActions({
    complex_loading_status: (state, action) => action.payload
}, false);

//第三步，如果在该models里有多个reducer，那么用combineReducers 集合一下
export default combineReducers({
    counts,
    loading
});

/*
 *我们的redux编码风格参照 ducks-modular-redux 提议 结合redux-actions的拓展 https://github.com/erikras/ducks-modular-redux
 *1、一个功能相关action和reducer统一到models里
 *2、actiontor通过export导出
 *3、reducer通过export default导出
 */
