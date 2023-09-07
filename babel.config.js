// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "nativewind/babel",
      ["module-resolver", {
        extensions: [".ts", ".tsx"],
        root: ["./src"],
        alias: {
          "assets/*": "./src/assets/*",
          "components/*": "./src/components/*",
          "constants/*": "./src/constants/*",
          "hooks/*": "./src/hooks/*",
          "navigation/*": "./src/navigation/*",
          "redux/*": "./src/redux/*",
          "screens/*": "./src/screens/*",
          "types/*": "./src/types/*",
          "utils/*": "./src/utils/*"
        }
      }]
    ],
  };
};
