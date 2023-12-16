// provider a provider
// provider a consumer

import { createContext } from 'react';
import { IHMapState } from '../components/Map';

// create a hook for the platform context
export const MapContext = createContext<IHMapState>({});
