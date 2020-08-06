#!/usr/bin/env node

"use strict";
const program = require("commander");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs-extra");
const log = console.log;

program

    .version("0.0.1", "-v, --version")
    // 定义 -c 选项，接受一个必选参数 componentName：组件名称
    .option("-c, --component-name <componentName>")

    // 定义 -r 选项：表示是否是redux文件
    .option("-r, --redux")

    // 定义执行 g 命令后调用的回调函数
    .action(function (cmd) {
        // 当 -c 选项没有传参数进来时，报错、退出
        if (!cmd.componentName) {
            log(chalk.red("error: missing required argument `componentName`"));
            process.exit(1);
        }
        // 创建组件
        createComponent(cmd.componentName, cmd.redux);
    });

program.parse(process.argv);

/**
 * 创建组件
 * @param {string} componentName 组件名称
 * @param {boolean} isRedux 是否是redux组件
 */
function createComponent(componentName, isRedux = false) {
    let dirPath = path.join(process.cwd());
    // 组件在文件夹中
    if (!isRedux) {
        dirPath = path.join(dirPath, componentName);
        const result = fs.ensureDirSync(dirPath);
        // 目录已存在
        if (!result) {
            log(chalk.red(`${dirPath} already exists`));
            process.exit(1);
        }
    }

    let component;
    if (!isRedux) {
        // redux文件
        component = getClassComponent(componentName);
        fs.writeFileSync(path.join(dirPath, `${componentName}.jsx`), component);
        fs.writeFileSync(path.join(dirPath, `${componentName}.less`), `.${componentName}-container{}`);
    } else {
        // 业务组件
        component = getReduxComponent(componentName);
        fs.writeFileSync(path.join(dirPath, `${componentName}.js`), component);
    }

    log(chalk.green(`The ${componentName} component was successfully generated!`));
    process.exit(1);
}

/**
 * 获取类组件字符串
 * @param {string} componentName 组件名称
 */
function getClassComponent(componentName) {
    return `
import React, { Component } from 'react';
import { CatchErrorBoundary } from "@common";
import { } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actiontor } from "@models/${componentName}.js";
import './${componentName}.less';

export default
@connect(
    ({ ${componentName} }) => ({ ...${componentName} }),
    (dispatch, ownProps) => bindActionCreators( actiontor, dispatch)
)
class ${componentName} extends Component {

    state = {}

    componentDidMount(){}

    render() {
        return (
            <CatchErrorBoundary>
                <div className="${componentName}-container">
                    
                </div>
            </CatchErrorBoundary>
        );
    }
}`;
}

/**
 * 获取redux文件字符串
 * @param {string} componentName 组件名称
 */
function getReduxComponent(componentName) {
    return `
import { combineReducers } from "redux";
import { createActions, handleActions } from "redux-actions";

export const actiontor = createActions({
    query_demo(param) {
        return async function (dispatch) {
            return await fetch("/url", { body: JSON.stringify(param) });
        };
    },

    set_demo: (payload) => payload,

});

const queryDemoData = handleActions(
    {
        query_demo: (state, action) => action.payload,
    },
    {}
);

const setDemoData = handleActions(
    {
        set_demo: (state, action) => action.payload,
    },
    ""
);

export default combineReducers({
    queryDemoData,
    setDemoData
});

`;
}
