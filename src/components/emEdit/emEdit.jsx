import React, { Component } from 'react';
import {AMapAsync,EmEditAsync} from '@js/AsyncCDN.js';
import './aMap.less';
import treeObj from './tree.obj';
import modelObj from './model.obj';
import modelMtl from './model.mtl';

let data = {
    objects:[
        {
            paths:[
                [106.532066,29.622376],
                [106.52307,29.617414],
                [106.526619,29.619541],
                [106.526019,29.622376],
                [106.523585,29.622824]
            ],
            geometryParameters:{
                depth:3000,
                bevelEnabled: false
            },
            // materialParameters:{
            //     type:'MeshPhongMaterial',
            //     color: 0xffaa00,
            //     transparent: true,
            //     opacity:.8,
            //     flatShading:true
            // },
            offset:[0,0,2000],
            type:'POLYGON'
        },
        {
            paths:[
                [106.534066,29.622376],
                [106.523078,29.617414],
                [106.526619,29.619841],
                [106.527019,29.622376],
                [106.523585,29.622824]
            ],
            type:'POLYGON'
        },{
            paths:[
                [106.578948, 29.580787],
                [106.532514, 29.552867],
                [106.567361, 29.531361],
                [106.625897, 29.531585],
                [106.624867, 29.58549]
            ],
            type:'POLYGON'
        }
        ,{
            type:'MODEL',
            meshPath:treeObj,
            lnglat:[106.498066,29.622376],
            scale:[20000,20000,20000],
            offset:[0,0,5000]
        }
        ,{
            type:'MODEL',
            meshPath:modelObj,
            materialsPath:modelMtl,
            lnglat:[106.518066,29.622376],
            scale:[2000,2000,2000]
        }
    ],
    decorate:[{

    }]
}



export default class AMapDemo extends Component {

    async init(){

        this.AMap = await AMapAsync();
        this.EmEdit = await EmEditAsync();
        await this.loadView();

    }

    async loadView(){

        let map = new this.AMap.Map('aMapDemoContainer', {
            viewMode:'3D',
            pitch: 50,
            zoom: 10,
            mapStyle: 'amap://styles/whitesmoke'
        });

        let EmEdit = new this.EmEdit(map,data);

        await EmEdit.create();

        setTimeout(function(){
            EmEdit.editObject(0,{
                paths:[
                    [106.534066,29.622376],
                    [106.523078,29.617414],
                    [106.526619,29.619841],
                    [106.527019,29.622376],
                    [106.523585,29.622824]
                ],
                geometryParameters:{
                    depth:3000,
                    bevelEnabled: false
                },
                materialParameters:{
                    type:'MeshPhongMaterial',
                    color: 0xffaa00,
                    transparent: true,
                    opacity:.8,
                    flatShading:true
                },
                offset:[0,0,5000],
                type:'POLYGON'
            });
        },5000)

    }


    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <div>
                <div id="aMapDemoContainer" className="aMapDemoContainer"></div>
            </div>
        );
    }
}




