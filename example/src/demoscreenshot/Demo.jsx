import React from 'react';

import {
  HPlatform,
  HMap,
  HMapMarkers,
  HMapRoute,
  HMapCircle,
  HMapPolygon,
  HMapPolyline,
  HMapRectangle
} from 'react-here-maps';

function DemoScreenshot() {
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };
  const points = [
    {
      lat: 51,
      lng: 6
    },
    {
      lat: 53,
      lng: 6.5
    }
  ];
  const points2 = {
    lat: 52.370216,
    lng: 4.895168
  };
  const points3 = [
    {
      lat: 51.5,
      lng: 5
    },
    {
      lat: 51.3,
      lng: 4
    }
  ];

  const points4 = [
    {
      lat: 53.5,
      lng: 5
    },
    {
      lat: 53.3,
      lng: 4
    },
    {
      lat: 52.7,
      lng: 4.5
    }
  ];

  const points5 = [
    {
      lat: 52.7,
      lng: 5.6
    },
    {
      lat: 52.8,
      lng: 5.9
    },
    {
      lat: 53.1,
      lng: 5.6
    },
    {
      lat: 53.2,
      lng: 5.8
    }
  ];

  const points6 = [
    {
      lat: 53.3,
      lng: 5.6
    },
    {
      lat: 53.5,
      lng: 6.3
    }
  ];

  const svg = `<svg height="35pt" viewBox="-46 0 512 512" width="35pt" xmlns="http://www.w3.org/2000/svg"><path d="m210 512c-5.683594 0-10.875-3.210938-13.417969-8.292969l-46.140625-92.28125c-88.921875-26.214843-150.441406-108.066406-150.441406-201.425781 0-115.792969 94.207031-210 210-210s210 94.207031 210 210c0 93.363281-61.519531 175.214844-150.445312 201.429688l-46.140626 92.277343c-2.539062 5.082031-7.734374 8.292969-13.414062 8.292969zm0 0" fill="#ff415b"/><path d="m210 0v512c5.679688 0 10.875-3.210938 13.414062-8.292969l46.140626-92.277343c88.925781-26.214844 150.445312-108.066407 150.445312-201.429688 0-115.792969-94.207031-210-210-210zm0 0" fill="#b20042"/><path d="m210 270c-33.085938 0-60-26.914062-60-60s26.914062-60 60-60 60 26.914062 60 60-26.914062 60-60 60zm0 0" fill="#ffda2d"/><path d="m210 150v120c33.085938 0 60-26.914062 60-60s-26.914062-60-60-60zm0 0" fill="#ebb100"/></svg>`;

  return (
    <div className='map'>
      <HPlatform app_id='' app_code='' interactive includeUI>
        <HMap mapOptions={mapOptions}>
          <HMapCircle coords={points2} radius={30} />
          <HMapMarkers points={points3} icon={svg} />
          <HMapPolygon points={points4} />
          <HMapPolyline points={points5} />
          <HMapRectangle points={points6} />
          <HMapRoute
            routeParams={{
              mode: 'shortest;car;traffic:disabled',
              waypoints: points,
              representation: 'display'
            }}
            lineOptions={{ style: { strokeColor: 'orange', lineWidth: 7 } }}
          />
        </HMap>
      </HPlatform>
    </div>
  );
}

export default DemoScreenshot;
