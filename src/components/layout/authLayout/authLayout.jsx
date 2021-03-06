import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
/*
 *懒加载模块components
 */
// import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';
import "./authLayout.less";
import { actiontor } from "@models/count.js";

import { renderRoutes } from "react-router-config";
import CatchErrorBoundary from "@common/catchErrorBoundary";
import { TransitionGroup, CSSTransition } from "react-transition-group";

/*
组件AuthLayout连接到store，
通过bindActionCreators把action和dispanth合并，方便调用。你也可以不传入connect的第二个参数结合bindActionCreators完成上述操作,在组件中通过dispanth结合action使用。
*/
@connect(({ count }) => ({ count }), (dispatch, ownProps) => bindActionCreators(actiontor, dispatch))
@withRouter
export default class AuthLayout extends Component {
    componentDidMount() {}

    /*
    这里假设获取 count的值和操作count的值在不同的组件中，并且操作count的组件不是获取count组件的父级
    当然咯正常这种情况我们用this.state就够了。
    */
    handlClick(e) {
        if (e.target.name === "increment") {
            this.props.countIncrement(1);
        } else if (e.target.name === "decrement") {
            this.props.countDecrement(1);
        } else if (e.target.name === "multiply") {
            this.props.countMultiply(2);
        }
    }

    render() {
        // console.log(this.props.location);
        return (
            <div>
                <i className="icon iconfont icon-ugly-nav"></i>
                <div>count被缓存到了locastorage</div>
                <div>{this.props.count}</div>
                <button name="increment" onClick={this.handlClick.bind(this)}>
                    click increment
                </button>
                <button name="decrement" onClick={this.handlClick.bind(this)}>
                    click decrement
                </button>
                <button name="multiply" onClick={this.handlClick.bind(this)}>
                    click multiply
                </button>
                <ul>
                    <li>
                        <Link to="/auth/123/workhome/project">project</Link>
                    </li>
                    <li>
                        <Link to="/auth/123/workhome/personage">personage</Link>
                    </li>
                </ul>
                过渡例子
                <CatchErrorBoundary>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.pathname} classNames="fade-node" timeout={300}>
                            {renderRoutes(this.props.route.routes, {}, { location: this.props.location })}
                        </CSSTransition>
                    </TransitionGroup>
                </CatchErrorBoundary>
            </div>
        );
    }
}
