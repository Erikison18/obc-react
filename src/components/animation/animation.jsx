import React, { Component, Fragment} from 'react';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import './animation.less';

TweenOne.plugins.push(Children);

class TweenOneDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:0
        };
    }

    componentDidMount() {
        this.setAnimation(this.props.value);
    }

    componentWillReceiveProps(nextProps) {
        this.setAnimation(nextProps.value);
    }

    setAnimation(value){
        this.setState({
            animation: {
                Children: {
                    value: value,
                    floatLength: 2,
                    formatMoney:true,
                },
                onUpdate:({ index, target, ratio })=>{
                    this.setState({
                        value:this.parseFormat(ratio*value)
                    });
                },
                onComplete:()=>{
                    this.setState({
                        value:this.parseFormat(value)
                    });
                },
                duration: 1000,
            }
        });
    }

    parseFormat(value){
        return (value.toFixed(2).toString()).replace(/\B(?=(\d{3})+\b)/g, ',').split('').map(this.props.format);
    }

    render() {
        return (
            <div>
                <TweenOne
                    animation={this.state.animation}
                    style={{ fontSize: 56, marginBottom: 12, display:'none' }}
                >
                </TweenOne>
                {this.state.value}
            </div>
        );
    }
}

class Demo extends Component {
    constructor(){
        super();
        this.state={
            value:10000
        };
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                value:100000
            });
        }, 2000);
    }
    render(){
        return(
            <Fragment>
                <div className="warning"/>
                <TweenOneDemo value={this.state.value} format={(item, i)=><span key={i} style={{color:'red'}}>{item}</span>}/>
            </Fragment>
        );
    }
}

export default Demo;
