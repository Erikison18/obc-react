import React, { Component } from 'react';
import { WingBlank, WhiteSpace, Button, Carousel } from 'antd-mobile';
import './mobile.less'

export default class Mobile extends Component{
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render(){
        return (
            <div>
                <WingBlank>
                    <Button>default</Button><WhiteSpace />
                    <Button disabled>default disabled</Button><WhiteSpace />

                    <Button type="primary">primary</Button><WhiteSpace />
                    <Button type="primary" disabled>primary disabled</Button><WhiteSpace />

                    <Button type="warning">warning</Button><WhiteSpace />
                    <Button type="warning" disabled>warning disabled</Button><WhiteSpace />

                    <Button loading>loading button</Button><WhiteSpace />
                    <Button icon="check-circle-o">with icon</Button><WhiteSpace />
                    <Button icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg" alt="" />}>with custom icon</Button><WhiteSpace />
                    <Button icon="check-circle-o" inline size="small" style={{ marginRight: '4px' }}>with icon and inline</Button>
                    <Button icon="check-circle-o" inline size="small">with icon and inline</Button>
                <WhiteSpace />

                    {/* <Button activeStyle={false}>无点击反馈</Button><WhiteSpace /> */}
                    {/* <Button activeStyle={{ backgroundColor: 'red' }}>custom feedback style</Button><WhiteSpace /> */}

                <WhiteSpace />
                    <Button type="primary" inline style={{ marginRight: '4px' }}>inline primary</Button>
                    {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
                    <Button type="ghost" inline style={{ marginRight: '4px' }} className="am-button-borderfix">inline ghost</Button>

                    <WhiteSpace />
                    <Button type="primary" inline size="small" style={{ marginRight: '4px' }}>primary</Button>
                    <Button type="primary" inline size="small" disabled>primary disabled</Button>
                    <WhiteSpace />
                    <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>ghost</Button>
                    {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
                    <Button type="ghost" inline size="small" className="am-button-borderfix" disabled>ghost disabled</Button>
                </WingBlank>
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                      ))}
                    </Carousel>
                </WingBlank>
            </div>
        )

    }
}