//外部例子统一在.storybook/resource中定义编写
import it from '@.sr/canvas/canvas-it.html';
import time from '@.sr/canvasTime.html';


export default {
    title: 'htmlDocuments',
};
export const itDemo = () => it;
export const timeDemo = () => time;