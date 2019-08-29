import React, { Component } from 'react';
import './index.less'
import B from '../B'

class index extends Component {
    componentDidMount(){
        console.log(process.env.FETCH_PREFIX)
    }
    render() {
        return (
            <div>
                <div className="aabb"></div>
                <B></B>
            </div>
        );
    }
}

export default index;
