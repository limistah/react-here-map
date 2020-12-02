import React from 'react';

import { HPlatform, HMap } from 'react-here-maps';

function Map() {
  return (
    <div className='map'>
      <HPlatform
        app_id='2Ts3vDUTLPW8kNUtyFRY'
        app_code='MDivMVFtNkpim-dWuetlWw'
        interactive
        includeUI
        useHTTPS
      >
        <HMap />
      </HPlatform>
    </div>
  );
}

export default Map;
