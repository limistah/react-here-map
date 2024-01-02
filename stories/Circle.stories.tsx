import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HMap, HMapCircle, IHMapCircleProps, useHPlatform } from '../src';

const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';

const centerCoords = { lat: 52.5309825, lng: 13.3845921 };

const circleOptions = {
  style: {
    strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
    lineWidth: 4,
    fillColor: 'rgba(0, 128, 0, 0.7)', // Color of the circle
  },
};

function logEvent(evt) {
  const evtLog = ['event "', evt.type, '" @ ' + evt.target.getData()].join('');
  console.log(evtLog);
}

const meta: Meta = {
  title: 'HMapCircle',
  component: HMapCircle,
  argTypes: {},
  args: {
    coords: centerCoords,
    options: circleOptions,
    radius: 10000,
    setVisibility: true,
    zoom: 8,
    events: {
      pointerdown: logEvent,
      pointerenter: logEvent,
      pointerleave: logEvent,
      pointermove: logEvent,
    },
  },
};

export default meta;

const Template: Story<IHMapCircleProps> = args => {
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
      <HMapCircle {...args} />
    </HMap>
  );
  return renderHMapComponents;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
