import React from "react";
import ReactDOM from "react-dom";
import HMap from "./components/HMap";
import HMapPolyLine from "./components/objects/PolyLine";

var points = [
  { lat: 52.5309825, lng: 13.3845921 },
  { lat: 52.5311923, lng: 13.3853495 },
  { lat: 52.5313532, lng: 13.3861756 },
  { lat: 52.5315142, lng: 13.3872163 },
  { lat: 52.5316215, lng: 13.3885574 },
  { lat: 52.5320399, lng: 13.3925807 },
  { lat: 52.5321472, lng: 13.3935785 },
  { lat: 52.5323832, lng: 13.395499 },
  { lat: 52.5324261, lng: 13.3959818 },
  { lat: 52.5325012, lng: 13.397795 },
  { lat: 52.5325656, lng: 13.3986318 },
  { lat: 52.5326192, lng: 13.3989215 },
  { lat: 52.5325119, lng: 13.3989751 },
  { lat: 52.5323081, lng: 13.3991039 },
  { lat: 52.5318789, lng: 13.3994472 },
  { lat: 52.5301194, lng: 13.4009278 },
  { lat: 52.5297546, lng: 13.4012604 },
  { lat: 52.5296152, lng: 13.4014106 },
  { lat: 52.5289822, lng: 13.4018934 },
  { lat: 52.5276947, lng: 13.4029663 },
  { lat: 52.5271797, lng: 13.4033203 },
  { lat: 52.5269973, lng: 13.4033954 },
  { lat: 52.5265145, lng: 13.4035349 },
  { lat: 52.5260746, lng: 13.4036851 },
  { lat: 52.5260103, lng: 13.4038353 },
  { lat: 52.5256562, lng: 13.40464 },
  { lat: 52.5253022, lng: 13.4053588 },
  { lat: 52.5250447, lng: 13.4059381 },
  { lat: 52.5249588, lng: 13.4062278 },
  { lat: 52.5249267, lng: 13.4064317 },
  { lat: 52.5249052, lng: 13.406775 },
  { lat: 52.5248623, lng: 13.4069574 },
  { lat: 52.5241864, lng: 13.4089208 },
  { lat: 52.5241327, lng: 13.4091246 },
  { lat: 52.5240898, lng: 13.409307 },
  { lat: 52.524004, lng: 13.4096611 },
  { lat: 52.5239503, lng: 13.4101653 },
  { lat: 52.5239289, lng: 13.4110343 },
  { lat: 52.5238967, lng: 13.4117103 },
  { lat: 52.5238752, lng: 13.4120321 },
  { lat: 52.5236285, lng: 13.4126866 },
  { lat: 52.5231242, lng: 13.4139311 },
  { lat: 52.5227809, lng: 13.4146714 },
  { lat: 52.5224799, lng: 13.4152412 }
];

ReactDOM.render(
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    appId="2Ts3vDUTLPW8kNUtyFRY"
    appCode="MDivMVFtNkpim-dWuetlWw"
  >
    <HMapPolyLine points={points} />
  </HMap>,
  document.getElementById("app")
);
module.hot.accept();
