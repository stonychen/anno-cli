const vuePreset = require('@vue/cli-plugin-babel/preset');

module.exports = (() => {

  return {
    presets: [
      vuePreset
    ],
    plugins: [
      require('babel-plugin-lodash'),
    ]
  };
})();
