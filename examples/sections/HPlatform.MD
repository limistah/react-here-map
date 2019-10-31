A container for all of the components in this library. Generates a platform that
are injected into all of its direct children.

```js static
import HPlatform, { HMap, HMapPolyLine } from "react-here-map";

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  {/*Children come in here*/}
</HPlatform>;
```

All direct children of `HPlatform` component receives:

- **platform** A reference to H.service.platform
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-service-platform.html)
- **options** A reference to the options used to bootstrap the scripts.
  [See here](https://www.npmjs.com/package/here-map-js):

### props

Props were determined by the options required for initializing a platform.

- **version** PropTypes.string - One of the supported version. Defaults to
  `'v3/3.0'`
- **app_id** PropTypes.string.isRequired - Application ID from account dashboard
- **app_code** PropTypes.string.isRequired - Application Code from account
  dashboard
- **mapType** PropTypes.string - One of the above types accessed as a dot prop.
  Default `'normal.map'`
- **interactive** PropTypes.bool - Makes the map react to events. Needed for
  event handling
- **includeUI** PropTypes.bool - Add the UI controls
- **includePlaces** PropTypes.bool - Add the module for working with places
- **useCIT** PropTypes.boolean - Default to `true`
- **useHTTPS** PropTypes.boolean - Load the library using HTTPS. Default to
  `true`
