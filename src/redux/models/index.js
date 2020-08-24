/*
所有reduce的归纳之处
export后提供给combineReducers组合后导入到整个store中
*/
export { loadingBarReducer as loadingBar } from "react-redux-loading-bar";
export { default as asyncDemo } from "./test/async.js";
export { default as count } from "./test/count.js";
export { default as complex } from "./test/complex.js";
export { default as reselector } from "./test/reselector.js";
