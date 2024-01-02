import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  HMap,
  IHMapPolylineProps,
  HMapRectangle,
  useHPlatform,
  IHMapRectangleProps,
} from '../src';
const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';

const points = [53.1, 13.1, 43.1, 40.1];

function logEvent(evt) {
  const evtLog = ['event "', evt.type, '" @ ' + evt.target.getData()].join('');
  console.log(evtLog);
}

const meta: Meta = {
  title: 'HMapRectangle',
  component: HMap,
  argTypes: {},
  args: {
    points,
    setVisibility: true,
    options: { style: { lineWidth: 2 } },
    events: {
      pointerdown: logEvent,
      pointerenter: logEvent,
      pointerleave: logEvent,
      pointermove: logEvent,
    },
  },
};

export default meta;

const Template: Story<IHMapRectangleProps> = args => {
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
      <HMapRectangle {...args} />
    </HMap>
  );
  return renderHMapComponents;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
