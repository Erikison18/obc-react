import React from "react";
import "./App.css";
import { Button, Icon } from "antd";
import A from "./AB";
import B from "./B";
import C from "./C";

function App() {
    return (
        <div className="App">
            <Button type="primary">Button</Button>
            <Icon type="smile" />
            <A></A>
            <B></B>
            <C></C>
            <div className='aa'></div>
        </div>
    );
}

export default App;
