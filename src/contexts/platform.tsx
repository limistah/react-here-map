// provider a provider
// provider a consumer

import { createContext } from 'react';
import { IHPlatformState } from '../components/Platform';

// create a hook for the platform context
export const PlatformContext = createContext<IHPlatformState>({
  platform: null,
});
