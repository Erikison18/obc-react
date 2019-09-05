import React, { useState } from 'react';
import { Button } from 'antd';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count + 1)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button type="primary" onClick={handleClick}>点我</Button>
    </div>
  );
}

export default Example;
