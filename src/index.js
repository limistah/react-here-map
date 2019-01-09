import React from "react";
import ReactDOM from "react-dom";
import lib from "./lib";
import defaults from "@limistah/here-map-js/src/defaults";

// const ret = await lib({
//   appId: "2Ts3vDUTLPW8kNUtyFRY",
//   appCode: "MDivMVFtNkpim-dWuetlWw",
//   container: document.getElementById("mapContainer")
// });

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  async componentDidMount() {
    await lib({
      appId: "2Ts3vDUTLPW8kNUtyFRY",
      appCode: "MDivMVFtNkpim-dWuetlWw",
      container: this.container.current,
      // container: document.getElementById("mapContainer"),
      interactive: true,
      useEvents: true,
      includeUI: true
    });
  }
  render() {
    // This will *not* work!
    return (
      <div
        id={defaults.containerId}
        className={defaults.defaultClassName}
        style={{
          height: "400px",
          width: "800px"
        }}
        ref={this.container}
      />
    );
  }
}
const title = "My Minimal React Webpack Babel Setup";

ReactDOM.render(<Parent />, document.getElementById("app"));
module.hot.accept();
