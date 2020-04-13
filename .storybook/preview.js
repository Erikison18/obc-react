import { addDecorator } from '@storybook/react';
import { withHTMLDOC } from 'storybook-addon-html-document/react';
import { withInfo } from '@storybook/addon-info';
import { withConsole, setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
    panelExclude: [],
});

addDecorator(withHTMLDOC);
// addDecorator(withInfo);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));