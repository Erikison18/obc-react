import React, { useState, useEffect } from "react";
import { Button } from "antd";

import { ComponentA, ComponentB } from "@rc";

function Example() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    useEffect(() => {
        console.log("我只在页面挂载时打印");
        return () => {
            console.log("我只在页面卸载时打印");
        };
    }, []);

    useEffect(() => {
        console.log("页面更新时打印");
    }, [count]);

    return (
        <div>
            <p>You clicked {count} times</p>
            <ComponentA />
            <ComponentB />
            <Button type="primary" onClick={handleClick}>
                点我
            </Button>
        </div>
    );
}

export default Example;
