import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HPlatform, IHPlatform, useHPlatform } from '../src';
import { ILoadHMapOptions } from '../src/components/libs/loadHMap';
const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';
const meta: Meta = {
  title: 'useHPlatform',
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

const Template: Story<ILoadHMapOptions> = args => {
  return useHPlatform(
    { ...args },
    <>Render Some Children Here, if Platform did load successfully</>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
