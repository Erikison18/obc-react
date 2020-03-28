import React from 'react';
import {withHTML} from '@.storybook/storybook-addons-iframe/decorators/react.js';
import it from '@.storybook/stories/canvas-it.html';
import time from '@.storybook/stories/canvasTime.html';
import Button from './button.jsx';

export default {
  title: 'Demo',
  decorators: [withHTML],
};
export const itDemo = () => it;
export const timeDemo = () => time;
export const html = () => `<div><div>??????
??????????</div>
</div>`;

export const rawEl = () => document.createElement('div');


export const reactEl1 = () => <div>reactEl1</div>;
export const reactEl2 = () => <Button>reactEl2</Button>;


