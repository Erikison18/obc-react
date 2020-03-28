import React from 'react';
import {withHTML} from '/Users/dengshiwei/Documents/AsiaInfo/product/react/.storybook/storybook-addons-iframe/decorators/react.js';
import it from './canvas-it.html';
import time from './canvasTime.html';
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

export const reactEl1 = () => <div>reactEl1</div>;
export const reactEl2 = () => <Button>reactEl2</Button>;
