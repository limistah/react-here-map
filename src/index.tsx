import React, { FC, HTMLAttributes, ReactChild } from 'react';
import { useHPlatform } from './components/Platform';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556

export const Thing: FC<Props> = ({ children }) => {
  const renderHereComponents = useHPlatform(
    {
      appId: '2Ts3vDUTLPW8kNUtyFRY',
      appKey: 'MDivMVFtNkpim-dWuetlWw',
    },
    <>{children || `the snozzberries taste like snozzberries`}</>
  );
  return <div>{renderHereComponents}</div>;
};

export * from './components';