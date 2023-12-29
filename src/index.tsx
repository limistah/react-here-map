import React, { FC, HTMLAttributes, ReactChild } from 'react';
import { useHPlatform } from './components/Platform';
import { HMap } from './components';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556

export const Thing: FC<Props> = props => {
  console.log({ props });
  const renderHereComponents = useHPlatform(
    {
      appId: 'EF8K24SYpkpXUO9rkbfA',
      apiKey: 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew',
      includeUI: true,
      includePlaces: false,
      version: 'v3/3.1',
      interactive: true,
    },
    <HMap
      style={{
        height: '480px',
        width: '100%',
      }}
      useEvents
      options={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    />
  );
  return <div>{renderHereComponents}</div>;
};

export * from './components';