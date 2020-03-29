import React from 'react';
//外部例子统一在.storybook/resource中定义编写
import it from '@.sr/canvas/canvas-it.html';
import time from '@.sr/canvasTime.html';
//内部组件例子按同名策略放置编写
import Button from './button.jsx';

export default {
  title: 'Demo',
};
export const itDemo = () => it;
export const timeDemo = () => time;
export const html = () => `<div><div>??????
??????????</div>
</div>`;

export const rawEl = () => document.createElement('div');


export const reactEl1 = () => <div>reactEl1</div>;
export const reactEl2 = () => <Button>reactEl2</Button>;


