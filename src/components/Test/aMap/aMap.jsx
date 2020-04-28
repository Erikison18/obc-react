import React, { Component } from 'react';
import {AMapAsync, LocaAsync, BMapAsync} from '@js/AsyncCDN.js';
import './aMap.less';
import data from './data.json';// 市县位置数据

export default class AMapDemo extends Component {

    async renderLoca(){

        let Loca = await LocaAsync();

        let loca = Loca.create('locaDemoContainer', {
            mapStyle: 'amap://styles/grey',
            zoom: 5,
            center: [107.4976, 32.1697],
            features: ['bg', 'road'],
            pitch: 50,
        });

        let layer = Loca.visualLayer({
            container: loca,
            type: 'point',
            shape: 'circle'
        });

        layer.setData(data, {
            lnglat: 'lnglat'
        });

        layer.setOptions({
            style: {
                // 支持动态回调，为每一个点设置半径
                radius: function (obj) {
                    // 城市类型，0：省会直辖市，1：地级市，2：区县
                    var style = obj.value.style;
                    var r;
                    if (style === 0) {
                        r = 6;
                    } else if (style === 1) {
                        r = 3;
                    } else {
                        r = 1.5;
                    }

                    return r;
                },
                color: '#47aff7',
                borderColor: '#c3faff',
                borderWidth: 1,
                opacity: 0.8
            }
        });

        layer.render();

    }

    async renderAMap(){

        this.AMap = await AMapAsync({plugin:['AMap.DistrictSearch']});

        let opts = {
            subdistrict: 0,   //获取边界不需要返回下级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: 'district'  //查询行政级别为 市
        };
        let district = new this.AMap.DistrictSearch(opts);

        console.log(district);

        this.map = new this.AMap.Map('aMapDemoContainer', {
            viewMode:'3D',
            pitch: 50,
            zoom: 10,
            // mapStyle: 'amap://styles/whitesmoke'
        });

    }

    async renderBMap(){
        let BMap = await BMapAsync();
        let map = new BMap.Map('bMapDemoContainer');
        map.centerAndZoom(new BMap.Point(104.070367, 30.579786), 18);
        // 百度地图API功能

        this.BmapClass = map;
        this.BMapClass = BMap;

    }

    async createCustomLayout(){

        let div = document.createElement('div');

        div.id = 'customLayer';

        // 将 div 宽高设置为地图实例的宽高
        div.width = this.map.getSize().width;
        div.height = this.map.getSize().height;
        // 创建一个自定义图层
        let customLayer = new this.AMap.CustomLayer(div, {
            zIndex: 12,
            // zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
        });

        this.map.add(customLayer);

    }

    searchClick = () =>{

        // this.BmapClass = map;
        // this.BMapClass = BMap;
        var myKeys = ['超市', '餐厅（饭馆）', '公司', '政府单位', '金融科技大厦', '网点', '便利店（24小时）'];
        var local = new this.BMapClass.LocalSearch(this.BmapClass, {
            renderOptions:{map: this.BmapClass, panel:"r-result"},
            pageCapacity:1
        });
        local.searchInBounds(myKeys, this.BmapClass.getBounds());
        local.setSearchCompleteCallback(function(data){
            console.log(data);
            let newData = data.reduce((prev, item)=>{

                prev.data[item.keyword]=item.Ar;
                prev.totalNum+=item.Ar.length;

                return prev;

            }, {
                data:{},
                totalNum:0
            });
            console.log(JSON.stringify(newData));
        });

    }

    componentDidMount() {
        this.renderAMap().then(this.createCustomLayout.bind(this));
        this.renderLoca();
        this.renderBMap();
    }

    render() {
        return (
            <div onClick={this.searchClick}>
                <div id="aMapDemoContainer" className="aMapDemoContainer"></div>
                <div id="locaDemoContainer" className="locaDemoContainer"></div>
                <div id="bMapDemoContainer" className="bMapDemoContainer"></div>
            </div>
        );
    }
}




