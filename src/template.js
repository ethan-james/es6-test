'use strict';

import functional from "./functional";
import Model from "./model";

export default class Template extends Model {

  constructor(value, name, opts) {
    super(value || {}, name || value.name || value.title || "template", opts)
    this.type = value.template_type || "template";
  }

  gettersetter(value) {
    if (!functional.isEmpty(value)) {
      if (value.template_type) {
        this.type = value.template_type;
      }

      this.applyModifiers(value);
    }
    return this.toObject();
  }

  assign(value) {
    if (this.isValid(value)) {
      this.value = functional.applyModifiers(this.value, value);
    }
  }

  isValid(value) {
    return functional.isObject(value);
  }

  clear(value) {
    this.value = functional.applyModifiers({}, value || {});
  }

  crunch() {
    this.dependents.forEach(dependent => {
      Object.keys(this.value).forEach(key => {
        if (dependent.attributes[key]) {
          dependent.attributes[key].addDependency({
            args  : functional.inferParameters(i),
            func  : this.value[key],
            model : this
          });
        }
      });
    });
  }

  applyModifiers(modifiers) {
    this.value = functional.applyModifiers(this.value || {}, modifiers);
  }
};
