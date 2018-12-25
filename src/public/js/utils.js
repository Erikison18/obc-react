//格式化html里的代码换行成渲染时的换行和空格
export function formatTextCodeToview(string){

    string = string.replace(/[\n\r]/g,'<br/>');

    let reduxSpaceLength = string.match(/^\s*/)[0].length;
    let reduxSpaceReg = new RegExp(`(^\\s{${reduxSpaceLength}})|(\\<br\\/\\>\\s{${reduxSpaceLength}})`,'g');

    string.replace(reduxSpaceReg,'');

    return string.replace(/\s/g,'&nbsp;');

}