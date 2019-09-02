import React, { Component } from 'react';
import CatchErrorBoundary from '@common/catchErrorBoundary';
import { Input, Button, message } from 'antd';

class SettingBar extends Component {
    state = {
        currColor: '',
        currTexture: '',
        currHeight: '',
        currOverlays: [],
        currTargetId: '',
    };

    componentWillReceiveProps(nextProps) {
        const { barStickInfo, barCurrId } = nextProps.data;
        if (barCurrId === this.props.data.barCurrId)  // 去除无效点击
            return;
        this.setState({
            currColor: barStickInfo.currColor,
            currHeight: barStickInfo.currHeight,
            currTexture: barStickInfo.currTexture,
        })
    }

    deepCopy = (obj) => {
        return JSON.parse(JSON.stringify(obj))
    }

    handleSendUp = () => {
        const { currColor, currTexture, currHeight } = this.state;
        const { barOverlays, barCurrId } = this.props.data;
        if (!barCurrId) {
            message.error('请先选定覆盖物！');
            return;
        }
        let copyOverlays = this.deepCopy(barOverlays);
        copyOverlays.forEach((item, index) => {
            if (item.id === barCurrId) {
                copyOverlays[index].color = currColor;
                copyOverlays[index].height = currHeight;
                copyOverlays[index].texture = currTexture;
            }
        })
        let currTargetInfo = {
            currColor: currColor,
            currTexture: currTexture,
            currHeight: currHeight,
        }
        this.props.handleChange(copyOverlays, currTargetInfo);
    }

    handleContentChange = (e, target) => {
        this.setState({
            [target]: e.target.value,
        })
    }

    render() {
        const { currColor, currTexture, currHeight } = this.state;

        return (
            <CatchErrorBoundary>
                <span>属性录入： </span>
                <span>高度: </span> <Input size="small" placeholder="请输入高度" style={{ width: '100px', marginRight: 10 }} value={currHeight} onChange={(e) => this.handleContentChange(e, 'currHeight')} />
                <span>颜色: </span><Input size="small" placeholder="请输入颜色" style={{ width: '100px', marginRight: 10 }} value={currColor} onChange={(e) => this.handleContentChange(e, 'currColor')} />
                <span>材质: </span><Input size="small" placeholder="请输入材质" style={{ width: '100px', marginRight: 10 }} value={currTexture} onChange={(e) => this.handleContentChange(e, 'currTexture')} />
                <Button type="primary" size="small" onClick={() => this.handleSendUp()}>提交</Button>
            </CatchErrorBoundary>
        );
    }
}

export default SettingBar;
