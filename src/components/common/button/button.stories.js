import {withHtmlDocument} from '/Users/dengshiwei/Documents/AsiaInfo/product/react/.storybook/storybook-addons-iframe/decorators/html.js';

// console.log(imageFile,imageFile2);
// import WechatIMG118 from '../public/WechatIMG118.jpg';
// console.log(WechatIMG118,imageFile);

export default {
  title: 'Demo',
  decorators: [withHtmlDocument],
  parameters: {
    htmlDocument: {
      data: 'this data is passed to the addon',
    },
  }
};


// export const html = () => imageFile;

// export const iframe = () => '<iframe src="/index.html"></iframe>';
export const heading = () => '../public/canvas-it.html';



// export const button = () => {
//   const btn = document.createElement('button');
//   btn.type = 'button';
//   btn.innerText = 'Hello Button';
//   return btn;
// };
