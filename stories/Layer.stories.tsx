import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HMap, HMapLayer, IHMapLayerProps, useHPlatform } from '../src';

const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';

const centerCoords = { lat: 52.5309825, lng: 13.3845921 };

const meta: Meta = {
  title: 'HMapLayer',
  component: HMapLayer,
  argTypes: {},
  args: {
    type: 'vector.normal.traffic',
  },
};

export default meta;

const Template: Story<IHMapLayerProps> = args => {
  const renderHMapComponents = useHPlatform(
    {
      appId,
      apiKey,
      includeUI: true,
      includePlaces: false,
      version: 'v3/3.1',
      interactive: true,
    },
    <HMap
      options={{
        center: centerCoords,
      }}
      style={{
        height: '480px',
        width: '100%',
      }}
      useEvents
    >
      <HMapLayer {...args} />
    </HMap>
  );
  return renderHMapComponents;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
