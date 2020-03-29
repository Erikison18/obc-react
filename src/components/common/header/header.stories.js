import React from 'react';
import Header from './header.jsx';

export default {
  title: 'Header',
};

export const Text = () => <Header>Hello Header</Header>;

export const Emoji = () => (
  <Header>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Header>
);

Emoji.story = {
  parameters: {
    notes: 'A small component',
  },
};