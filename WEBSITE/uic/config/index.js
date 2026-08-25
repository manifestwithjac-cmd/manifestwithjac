/**
 * Node-only aggregator. In the browser, each config/*.js file merges itself
 * onto window.UIC directly (see the UMD header in each file) and this file
 * is never loaded — the HTML loads the sibling files individually instead.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
})(typeof self !== 'undefined' ? self : globalThis, function () {
  'use strict';

  var out = {};
  Object.assign(out, require('./questions.js'));
  Object.assign(out, require('./results.js'));
  Object.assign(out, require('./patterns.js'));
  Object.assign(out, require('./products.js'));
  Object.assign(out, require('./copy.js'));
  Object.assign(out, require('./integrations.js'));
  return out;
});
