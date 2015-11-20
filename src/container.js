'use strict';

import functional from "./functional";
import Model from "./model";

export default class Container extends Model {
  constructor(value = {}, name, opts) {
    super(value, name || value.name, Object.assign({ defaultValue : {} }, opts));
  }

  isValid(value) {
    return functional.isObject(value);
  }

  parseValue(value) {
    return value;
  }

  toObject() {
    return functional.objectMap(this.value, function (value, key) {
      return { [key] : value.toObject ? value.toObject() : value };
    });
  }
};