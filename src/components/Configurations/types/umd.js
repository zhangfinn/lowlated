export default `(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['b'], factory)
  } else {
    // Browser globals
    root.amdWeb = factory(root.b)
  }
})(typeof self !== 'undefined' ? self : this, function (b) {
  // Use b in some fashion.

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {}
})`
