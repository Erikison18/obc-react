import React, { Component } from 'react';

export default class WorkHome extends Component {

    constructor(){
        super();
        this.drawChannel = this.drawChannel.bind(this);
        this.mapZoomTo = this.mapZoomTo.bind(this);
    }


    drawChannel(type){
        /*do some*/
    }

    mapZoomTo(){
        /*do some*/
    }

    render() {
        return (
            <div className="block-two">
                <a onClick={this.drawChannel.bind(this,'clear')} className="underline-words week" href>清除地图</a>
                <div onClick={this.mapZoomTo} className="zoom-btn"></div>
            </div>
        );
    }
}




