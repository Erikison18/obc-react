import React from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';

import Panel from './Panel';

addons.register('dbp/htmlDocumentMarkup', () => {
  addons.add('markup/panel', {
    title: 'htmlDocument',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Panel />
      </AddonPanel>
    ),
  });
});
