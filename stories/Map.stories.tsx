import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HMap, IHMapProps } from '../src';

const meta: Meta = {
  title: 'HMap',
  component: HMap,
  argTypes: {},
  parameters: {},
};

export default meta;

const Template: Story<IHMapProps> = args => <HMap {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
