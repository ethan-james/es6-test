'use strict';

// define the factory, which can be bound to any Model
let Factory = function Factory(Model, value, name, opts, ...mixins) {
  // create a new Model instance, then add mixins to its prototype chain
  var chained = mixins.reduce((head, mixin) => {
    // create the new object at the head of the prototype chain, and copy
    // new properties from the mixin
    return Object.assign(Object.create(head), mixin);
  }, new Model(value, name, opts));

  Object.defineProperty(chained, "constructor", {
    value : this
  });

  return chained;
};

export default {
  create : Factory.bind(Object, Object),
  add : function (Model, name, opts) {
    // make sure that the correct value comes back if anyone mistakenly uses 'new'
    let func = function (value, name, opts) { return func.create(value, name, opts); };
    // curry the factory with the correct Model
    func.create = Factory.bind(func, Model);
    // expose the new factory as a property
    this[name] = func;
  }
};