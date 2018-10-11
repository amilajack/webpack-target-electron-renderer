

const { expect } = require('chai');
const { spy } = require('sinon');
const webpack = require('webpack');

const { JsonpTemplatePlugin } = webpack.web;
const FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const webpackTargetElectronRenderer = require('./');

const { ExternalsPlugin } = webpack;
const { LoaderTargetPlugin } = webpack;


it('should return a function', () => {
  expect(webpackTargetElectronRenderer({})).to.be.a('function');
});

it('should apply plugins to compiler', () => {
  const apply = spy();
  const compiler = {
    apply,
  };

  webpackTargetElectronRenderer({
    output: {},
  })(compiler);

  expect(apply.args[0][0]).to.be.an.instanceof(JsonpTemplatePlugin);
  expect(apply.args[0][1]).to.be.an.instanceof(FunctionModulePlugin);
  expect(apply.args[0][2]).to.be.an.instanceof(NodeTargetPlugin);
  expect(apply.args[0][3]).to.be.an.instanceof(ExternalsPlugin);
  expect(apply.args[0][4]).to.be.an.instanceof(LoaderTargetPlugin);
});
