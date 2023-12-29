import React, { useEffect, useState } from "react";
import loadMap from "./../../libs/loadMap";
import defaults from "./../../libs/defaults";
import merge from "lodash.merge";
import initPlatform from "./../../libs/initPlatform";

const optionMerger = (options) => merge(defaults, options);

function Platform(props) {
  const [platformData, setPlatformData] = useState({
    platform: {},
    options: {},
  });
  useEffect(() => {
    // const { version, interactive, includeUI, includePlaces } = props;
    loadMap(props).then((options) => {
      const platform = initPlatform(options);
      setPlatformData({ platform, options });
    });
  }, [platformData.platform.A]);
  const { platform, options } = platformData;

  return platform.A == "api.here.com" && options.apikey
    ? React.Children.map(props.children, (child) => {
        return React.cloneElement(child, { platform, options });
      })
    : null;
}

export default Platform;
