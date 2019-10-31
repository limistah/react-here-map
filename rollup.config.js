import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

const umdGlobals = {
  react: "React",
  "prop-types": "PropTypes"
};

export default {
  input: "./src/index.js",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "reactHereMap",
    globals: umdGlobals,
    sourcemap: "inline",
    exports: "named"
  },
  external: Object.keys(umdGlobals),
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs(),
    uglify()
  ]
};
