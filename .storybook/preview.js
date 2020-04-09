import { addDecorator } from '@storybook/react';
import { withHTMLDOC } from 'storybook-addon-html-document/react';
import { withConsole, setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
    panelExclude: [],
});

addDecorator(withHTMLDOC);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));