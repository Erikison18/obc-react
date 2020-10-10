const CIRCLE = "AMap.Circle";
const POLYGON = "AMap.Polygon";
const RECTANGLE = "AMap.Rectangle";

class MapTool {
    constructor(map, AMap) {
        this.map = map;
        this.AMap = AMap;
        this.objs = [];
    }

    deepCopy = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    };

    initMouseTool(_this) {
        this.mouseTool = new this.AMap.MouseTool(this.map);
        this.overlays = [];
        this.overlayEditors = [];

        // 设置右键菜单
        let contextMenu = new this.AMap.ContextMenu();
        contextMenu.addItem(
            "隐藏",
            () => {
                console.log("隐藏");
                this.currTarget.hide();
            },
            0
        );
        contextMenu.addItem(
            "隐藏其他",
            () => {
                console.log("隐藏其他");
                this.objs.forEach((item) => {
                    if (item.getExtData().id !== this.currId) {
                        item.hide();
                    }
                });
            },
            1
        );
        contextMenu.addItem(
            "删除",
            () => {
                this.overlays.forEach((item, index) => {
                    if (item.id === this.currId) {
                        this.overlays.splice(index, 1);
                    }
                });
                _this.setState(
                    {
                        stateOverlays: [...this.overlays],
                    },
                    () => {
                        console.log("删除结束，当前数据", _this.state.stateOverlays);
                    }
                );
                this.map.remove(this.currTarget);
            },
            2
        );
        contextMenu.addItem(
            "编辑",
            () => {
                console.log("编辑开始");
                this.handleEditTarget();
            },
            3
        );
        contextMenu.addItem(
            "关闭编辑",
            () => {
                console.log("编辑关闭");
                let newInfo = this.handleEditOff();
                this.overlays.forEach((item, index) => {
                    if (item.id === this.currId) {
                        this.overlays[index].info = newInfo;
                    }
                });
                _this.setState(
                    {
                        stateOverlays: [...this.overlays],
                    },
                    () => {
                        console.log("编辑结束，当前数据", _this.state.stateOverlays);
                    }
                );
            },
            4
        );

        // 绘制结束
        this.mouseTool.on("draw", (e) => {
            let type = e.obj["CLASS_NAME"];

            console.log(e.obj); // 留以甄别画方的属性问题

            let data = { info: {}, height: 0, color: "#fff", texture: "abab" }; // 预设图形数据
            data.id = Math.random().toString(36).slice(-8); // 产生随机图形 ID
            e.obj.setExtData({ id: data.id });
            data.type = type;
            data.info = this.handleGetInfo(type, e.obj);

            // 绑定左键点击事件
            e.obj.on("click", () => {
                console.log("左键点击");
                this.currId = e.obj.getExtData().id;
                this.currTarget = e.obj;
                this.handleEditTarget();
                // e.obj.setOptions({
                //     fillColor: '#ff0000',
                // })
                let currTargetInfo = {};
                this.overlays.forEach((item) => {
                    if (item.id === this.currId) {
                        currTargetInfo = {
                            currColor: item.color,
                            currTexture: item.texture,
                            currHeight: item.height,
                        };
                    }
                });
                _this.setState({
                    currTargetId: this.currId,
                    stickInfo: currTargetInfo,
                });
            });

            // 拖拽事件
            e.obj.on("dragging", () => {
                console.log("拖拽");
            });

            // 右键点击事件
            e.obj.on("rightclick", () => {
                switch (type) {
                    case RECTANGLE:
                        contextMenu.open(this.map, e.obj.getBounds().southwest);
                        break;
                    case CIRCLE:
                        contextMenu.open(this.map, e.obj.getCenter());
                        break;
                    case POLYGON:
                        contextMenu.open(this.map, e.obj.getPath()[0]);
                        break;
                    default:
                        break;
                }
                this.currId = e.obj.getExtData().id;
                this.currTarget = e.obj;
                _this.setState({
                    currTargetId: this.currId,
                });
            });

            this.mouseTool.close();
            this.overlays.push(data);
            this.objs.push(e.obj);

            _this.setState(
                {
                    stateOverlays: [...this.overlays],
                },
                () => {
                    console.log("绘制结束，当前数据", _this.state.stateOverlays);
                }
            );
        });
    }

    // 图形信息提取
    handleGetInfo = (type, obj) => {
        let info = {};
        if (type === CIRCLE) {
            info.center = obj.getCenter();
            info.radius = obj.getRadius();
        } else if (type === POLYGON) {
            info.path = obj.getPath();
        } else if (type === RECTANGLE) {
            info.bounds = obj.getBounds();
        }
        return info;
    };

    // 开始编辑
    handleEditTarget() {
        switch (this.currTarget.CLASS_NAME) {
            case RECTANGLE:
                this.RectangleEditor = new this.AMap.RectangleEditor(this.map, this.currTarget);
                this.RectangleEditor.open();
                break;
            case CIRCLE:
                this.circleEditor = new this.AMap.CircleEditor(this.map, this.currTarget);
                this.circleEditor.open();
                break;
            case POLYGON:
                this.polylineEditor = new this.AMap.PolyEditor(this.map, this.currTarget);
                this.polylineEditor.open();
                break;
            default:
                console.log("未匹配到该形状！");
                break;
        }
    }

    // 结束编辑
    handleEditOff() {
        let newInfo = {};
        switch (this.currTarget.CLASS_NAME) {
            case RECTANGLE:
                this.RectangleEditor.close();
                newInfo = this.handleGetInfo(RECTANGLE, this.currTarget);
                break;
            case CIRCLE:
                this.circleEditor.close();
                newInfo = this.handleGetInfo(CIRCLE, this.currTarget);
                break;
            case POLYGON:
                this.polylineEditor.close();
                newInfo = this.handleGetInfo(POLYGON, this.currTarget);
                break;
            default:
                console.log("未匹配到该形状！");
                break;
        }
        return newInfo;
    }

    // 某类图形的删除
    handleTypeClear(dataType, _this) {
        let type = "AMap." + dataType;
        let deletArr = this.objs.filter((element) => {
            return element.CLASS_NAME === type;
        });
        this.overlays.forEach((element, index) => {
            if (element.type === type) {
                this.overlays.splice(index, 1);
            }
        });
        _this.setState(
            {
                stateOverlays: [...this.overlays],
            },
            () => {
                console.log(type + "删除结束，当前数据", _this.state.stateOverlays);
            }
        );
        this.map.remove(deletArr);
    }

    // 某类图形的隐藏显示
    handleTypeOperation(coverType, operateType = "Show") {
        if (coverType === "All") {
            if (operateType === "Show") {
                this.objs.forEach((element) => {
                    element.show();
                });
            } else {
                this.objs.forEach((element) => {
                    element.hide();
                });
            }
            return;
        }
        let type = "AMap." + coverType;
        this.objs.forEach((element, index) => {
            if (element.CLASS_NAME === type) {
                if (operateType === "Hide") {
                    element.hide();
                } else {
                    element.show();
                }
            }
        });
        console.log(type + (operateType === "Show" ? " 显示结束" : " 隐藏结束"));
    }

    // 绘制处理
    handleTypeDraw(dataType, _this) {
        switch (dataType) {
            case "Circle": {
                this.mouseTool.circle({
                    fillColor: "#00b0ff",
                    strokeColor: "#80d8ff",
                    draggable: true,
                });
                _this.setState({
                    drawType: "circle",
                });
                break;
            }
            case "Polygon": {
                this.mouseTool.polygon({
                    fillColor: "#00b0ff",
                    strokeColor: "#80d8ff",
                    draggable: true,
                });
                _this.setState({
                    drawType: "polygon",
                });
                break;
            }
            case "Rectangle":
                this.mouseTool.rectangle({
                    fillColor: "#00b0ff",
                    strokeColor: "#80d8ff",
                    draggable: true,
                });
                break;

            case "Clear":
                this.clearOverlay();
                _this.setState({
                    drawType: "clear",
                });
                break;

            case "move":
                //关闭，但不会清除覆盖物
                this.closeOverlayAllEdit();
                this.mouseTool.close(false);
                this.overlayEditors = [];
                _this.setState({
                    drawType: "move",
                });
                break;
            default:
                _this.setState({
                    drawType: "",
                });
                break;
        }
    }

    // 清除所有绘制图形
    clearOverlay() {
        this.closeOverlayAllEdit();
        //关闭，并清除覆盖物
        this.mouseTool.close(true);
        this.overlayEditors = [];
        this.overlays = [];
        console.log("overlays", this.overlays);
    }

    closeOverlayAllEdit() {
        this.overlayEditors.length > 0 &&
            this.overlayEditors.forEach((overlay) => {
                overlay.close();
            });
    }
}

export default MapTool;
