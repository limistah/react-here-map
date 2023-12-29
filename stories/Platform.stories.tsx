import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HPlatform, IHPlatform } from '../src/';
const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';
const meta: Meta = {
  title: 'HPlatform JSX',
  component: HPlatform,
  args: {
    options: {
      appId,
      apiKey,
      includeUI: true,
      includePlaces: false,
      version: 'v3/3.1',
      interactive: true,
    },
    children: <>Overriden Children If all went well, yaay! 🙂 </>,
  },
};

export default meta;

const Template: Story<IHPlatform> = args => {
  return (
    <HPlatform options={args.options}>
      {args.children || 'Render Anything'}
    </HPlatform>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
