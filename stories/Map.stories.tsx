import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HMap, IHMapProps, useHPlatform } from '../src';
const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';
const meta: Meta = {
  title: 'HMap',
  component: HMap,
  argTypes: {},
  args: {
    options: {
      center: { lat: 52.5321472, lng: 13.3935785 },
    },
    style: {
      height: '480px',
      width: '100%',
    },
    useEvents: true,
  },
};

export default meta;

const Template: Story<IHMapProps> = args => {
  const renderHMapComponents = useHPlatform(
    {
      appId,
      apiKey,
      includeUI: true,
      includePlaces: false,
      version: 'v3/3.1',
      interactive: true,
    },
    <HMap {...args} />
  );
  return renderHMapComponents;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
