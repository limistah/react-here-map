import React from 'react';
import 'react-here-maps/dist/index.css';

import { HPlatform, HMap } from 'react-here-maps';

function App() {
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  return (
    <HPlatform
      app_id='neyAPVuS1vAnt3vn7fc8'
      app_code='Za2OC1iVL4HFE1UvbHX6AA'
      interactive
      includeUI
    >
      <HMap mapOptions={mapOptions} />
    </HPlatform>
  );
}

export default App;
