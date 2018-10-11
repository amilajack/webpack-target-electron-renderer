'use strict';

const webpack = require('webpack');
const FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');

const { LoaderTargetPlugin, ExtendedAPIPlugin, ExternalsPlugin } = webpack;
const { JsonpTemplatePlugin } = webpack.web;

console.log(ExternalsPlugin)

module.exports = function (options) {
  return function webpackTargetElectronRenderer(compiler) {
    compiler.apply(
      new JsonpTemplatePlugin(options.output),
      new FunctionModulePlugin(options.output),
      new NodeTargetPlugin(),
      new ExternalsPlugin('commonjs', [
        'desktop-capturer',
        'electron',
        'ipc',
        'ipc-renderer',
        'native-image',
        'remote',
        'web-frame',
        'clipboard',
        'crash-reporter',
        'screen',
        'shell'
      ]),
      new LoaderTargetPlugin(options.target)
    );
  };
};
