import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import routes from '@router';


export default class WorkHome extends Component {

    render() {
        return (
            <div>
                <h1>work home</h1>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}




