import React, { Component } from 'react';
import CatchErrorBoundary from '@common/catchErrorBoundary';
import { AMapAsync } from '@js/AsyncCDN.js';
import { Radio, message } from 'antd';

import MapTool from './AMap';
import SettingBar from './SettingBar'
import './indexStyle';

class Index extends Component {
    state = {
        stateOverlays: [],
        aMapWith: 100,
        stickInfo: {},
    };

    async componentDidMount() {
        this.AMap = await AMapAsync({ plugin: ['AMap.MouseTool', 'AMap.CircleEditor', 'AMap.PolyEditor', 'AMap.RectangleEditor'] });
        this.map = new this.AMap.Map('aMapContainer', {
            center: [106.504962, 29.533155],
            zoom: 14,
            mapStyle: 'amap://styles/dark',
            // viewMode: '3D',
            // resizeEnable: true,
            // rotateEnable:false,
            // pitchEnable:false,
            // pitch:65,
            // rotation:45,
        });
        this.mapTool = new MapTool(this.map, this.AMap);
        this.mapTool.initMouseTool(this);
    }

    handleTypeChange = (params) => {
        this.setState({
            aMapWith: params.target.value
        })
    }

    handleDraw = (param) => {
        this.mapTool.handleTypeDraw(param, this);
        // console.log(this.mapTool.overlays);
    }

    handleStickInfo = (paramOverlays, paramInfo) => {
        const { currTargetId } = this.state;
        const { currColor } = paramInfo;
        this.mapTool.objs.forEach(item => {
            if (item.getExtData().id === currTargetId) {
                item.setOptions({
                    fillColor: currColor,
                })
            }
        })
        this.mapTool.overlays = paramOverlays;
        this.setState({
            stateOverlays: [...paramOverlays],
            stickInfo: paramInfo,
        }, () => {
            message.success('数据绑定成功！');
            console.log('添加数据结束，当前数据', this.state.stateOverlays);
        })
    }

    handleClear = (param) => {
        let objsLength = this.mapTool.objs.length;
        if (objsLength === 0) {
            message.error('当前没有覆盖物！');
            return;
        }
        this.mapTool.handleTypeClear(param, this);
    }

    handleOperation = (coverType, operateType) => {
        let objsLength = this.mapTool.objs.length;
        if (objsLength === 0) {
            message.error('当前没有覆盖物！');
            return;
        }
        this.mapTool.handleTypeOperation(coverType, operateType);
    }



    render() {
        const { stateOverlays, currTargetId, aMapWith, stickInfo } = this.state;
        return (
            <CatchErrorBoundary>
                <div className="menu">
                    <span>简单菜单：</span>
                    <Radio.Group value={aMapWith} size="small" buttonStyle="solid" onChange={this.handleTypeChange}>
                        <Radio.Button value={100} >原图</Radio.Button>
                        <Radio.Button value={50} >对比</Radio.Button>
                        <Radio.Button value={0} >效果</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="menu">
                    <SettingBar data={{ barCurrId: currTargetId, barOverlays: stateOverlays, barStickInfo: stickInfo }} handleChange={this.handleStickInfo} />
                </div>
                <div className="bottom">
                    <div className="tools">
                        <div onClick={() => this.handleDraw('Circle')}>画圆</div>
                        <div onClick={() => this.handleDraw('Rectangle')}>画方</div>
                        <div onClick={() => this.handleDraw('Polygon')}>画多</div>
                        <div onClick={() => this.handleDraw('Clear')}>清除</div>
                        <div onClick={() => this.handleClear('Circle')}>清除圆</div>
                        <div onClick={() => this.handleClear('Rectangle')}>清除方</div>
                        <div onClick={() => this.handleClear('Polygon')}>清除多</div>
                        <div onClick={() => this.handleOperation('Circle', 'Hide')}>隐藏圆</div>
                        <div onClick={() => this.handleOperation('Rectangle', 'Hide')}>隐藏方</div>
                        <div onClick={() => this.handleOperation('Polygon', 'Hide')}>隐藏多</div>
                        <div onClick={() => this.handleOperation('Circle', 'Show')}>显示圆</div>
                        <div onClick={() => this.handleOperation('Rectangle', 'Show')}>显示方</div>
                        <div onClick={() => this.handleOperation('Polygon', 'Show')}>显示多</div>
                        <div onClick={() => this.handleOperation('All', 'Hide')}>隐藏全</div>
                        <div onClick={() => this.handleOperation('All', 'Show')}>显示全</div>

                    </div>
                    <div className="panel">
                        <div className="panel_1" id="aMapContainer" style={{ width: aMapWith + "%", height: "100%" }}></div>
                        <div className="panel_2" id="threeJSContainer" style={{ width: 100 - aMapWith + "%", height: "100%" }}></div>
                    </div>

                </div>
            </CatchErrorBoundary>
        );
    }
}

export default Index;
