'use strict';

let Factory = function Factory(Model, value, name, opts, ...mixins) {
  return mixins.reduce((head, mixin) => {
    return Object.assign(Object.create(head), mixin);
  }, new Model(value, name, opts));
};

export default {
  create : Factory.bind(null, Object),
  add : function (model, name, opts) {
    let func = function (value, name, opts) { return func.create(value, name, opts); };
    func.create = Factory.bind(null, model);
    this[name] = func;
  }
};