import React from "react";
import ReactDOM from "react-dom";
import lib from "./lib";

lib({
  appId: "2Ts3vDUTLPW8kNUtyFRY",
  appCode: "MDivMVFtNkpim-dWuetlWw"
});

const title = "My Minimal React Webpack Babel Setup";

ReactDOM.render(<div />, document.getElementById("app"));
module.hot.accept();
