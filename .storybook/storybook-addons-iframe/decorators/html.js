import { Node } from 'global';
import { addons, makeDecorator } from '@storybook/addons';
import { parameters } from '.';
import { EVENT_CODE_RECEIVED } from '../shared';
import path from 'path';

export const withHtmlDocument = makeDecorator({
  ...parameters,
  wrapper: (getStory, context, { options = {},parameters }) => {
    const channel = addons.getChannel();
    const element = getStory();
    // let html;
    // if (typeof element === 'string') {
    //   html = element;
    // } else if (element instanceof Node) {
    //   html = element.outerHTML;
    // }

    // import imageFile from 'url-loader?limit=1!../public/canvas-it.html';
    // import imageFile2 from '../public/canvas-it.html';
    let html = require('@other/canvas-it.html');
    let url = require('file-loader!@other/canvas-it.html');
console.log(url);

    channel.emit(EVENT_CODE_RECEIVED, { html, options });


    return `<iframe src="${url}"></iframe>`;
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
