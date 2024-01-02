import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  HMap,
  IHMapPolylineProps,
  HMapRectangle,
  useHPlatform,
  IHMapRectangleProps,
  HMapMarker,
  IHMapMarkerProps,
} from '../src';
const appId = 'EF8K24SYpkpXUO9rkbfA';
const apiKey = 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew';

const coords = { lat: 52.5309825, lng: 13.3845921 };

function logEvent(evt) {
  const evtLog = ['event "', evt.type, '" @ ' + evt.target.getData()].join('');
  console.log(evtLog);
}

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

const meta: Meta = {
  title: 'HMapMarker',
  component: HMap,
  argTypes: {},
  args: {
    coords,
    setVisibility: true,
    options: { style: { lineWidth: 2 } },
    icon,
    events: {
      pointerdown: logEvent,
      pointerenter: logEvent,
      pointerleave: logEvent,
      pointermove: logEvent,
    },
  },
};

export default meta;

const Template: Story<IHMapMarkerProps> = args => {
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
      <HMapMarker {...args} />
    </HMap>
  );
  return renderHMapComponents;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

export const MarkerIcon = Template.bind({ icon });

Default.args = {};
