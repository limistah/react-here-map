const path = require("path");
const { createConfig, babel, css } = require("webpack-blocks");

module.exports = {
  title: "react-here-map",
  styleguideDir: path.join(__dirname, "docs"),
  webpackConfig: createConfig([babel(), css()]),
  exampleMode: "expand",
  usageMode: "expand",
  showSidebar: true,
  serverPort: 8080,
  moduleAliases: {
    "react-here-map": path.resolve(__dirname, "./src")
  },
  require: [path.join(__dirname, "examples/theme.css")],
  sections: [
    {
      name: "Introduction",
      content: "./examples/sections/Introduction.MD"
    },
    {
      name: "Events",
      content: "./examples/sections/Events.MD"
    },
    {
      name: "Components",
      content: "./examples/sections/Components.MD",
      sections: [
        {
          name: "Platform",
          content: "./examples/sections/HPlatform.MD"
        },
        {
          name: "Map",
          content: "./examples/sections/HMap.MD",
          sections: [
            {
              name: "Marker",
              content: "./examples/sections/HMarker.MD"
            },
            {
              name: "Circle",
              content: "./examples/sections/HCircle.MD"
            },
            {
              name: "Polygon",
              content: "./examples/sections/HPolygon.MD"
            },
            {
              name: "Polyline",
              content: "./examples/sections/HPolyLine.MD"
            },
            {
              name: "Rectangle",
              content: "./examples/sections/HRectangle.MD"
            },
            {
              name: "Places",
              content: "./examples/sections/HPlaces.MD"
            }
            // {
            //   name: "GeoCoding",
            //   content: "./examples/sections/HGeoCode.MD"
            // },
            // {
            //   name: "Routing",
            //   content: "./examples/sections/HRoute.MD"
            // },
            // {
            //   name: "Layer",
            //   content: "./examples/sections/HLayer.MD"
            // }
          ]
        }
      ]
    }
  ]
};
