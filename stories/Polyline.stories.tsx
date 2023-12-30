import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HMap, HMapPolyline, IHMapPolylineProps, useHPlatform } from '../src';
const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';

const points = [
  { lat: 53.3477, lng: -6.2597 },
  { lat: 51.5008, lng: -0.1224 },
  { lat: 48.8567, lng: 2.3508 },
  { lat: 52.5166, lng: 13.3833 },
];

function logEvent(evt) {
  const evtLog = ['event "', evt.type, '" @ ' + evt.target.getData()].join('');
  console.log(evtLog);
}

const meta: Meta = {
  title: 'HMapPolyline',
  component: HMap,
  argTypes: {},
  args: {
    points,
    setVisibility: true,
    options: { style: { lineWidth: 4 } },
    events: {
      pointerdown: logEvent,
      pointerenter: logEvent,
      pointerleave: logEvent,
      pointermove: logEvent,
    },
  },
};

export default meta;

const Template: Story<IHMapPolylineProps> = args => {
  console.log(args);
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
        center: { lat: 52, lng: 5 },
      }}
      style={{
        height: '480px',
        width: '100%',
      }}
      useEvents
    >
      <HMapPolyline {...args} />
    </HMap>
  );
  return renderHMapComponents;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
