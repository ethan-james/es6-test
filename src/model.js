'use strict';

import functional from "./functional";

const NAME_SYMBOL = Symbol();

export default class Model {
  
  get name() {
    return this[NAME_SYMBOL];
  }

  set name(value) {
    this[NAME_SYMBOL] = value;
  }

  constructor(value, name, opts) {
    this.dependencies = [];
    this.dependents = [];
    this.name = name;
    this.options = Object.assign({ defaultValue : 0 }, opts);
    this.gettersetter(value || this.options.defaultValue);
  }

  gettersetter(value) {
    this.set(value);
    return this.toObject();
  }

  toString() {
    return this.toObject().toString();
  }

  toObject() {
    return this.value || this.options.defaultValue;
  }

  set(value) {
    if (this.isValid(value)) {
      this.value = this.parseValue(value);
    }
  }

  isValid(value) {
    return typeof value == "number";
  }

  parseValue(value) {
    return functional.parseNumber(value) || 0;
  }

  dealloc() {
    this.dependencies.forEach(d => { this.removeDependency(d.model) });
    this.dependents.forEach(d => d.removeDependency(this));
  }

  /* DEPENDENCY MANAGEMENT */

  addDependency(dependency) {
    let d = dependency;

    if (!d.model) { 
      d = { args : [], model : dependency, func : function () {
        if (typeof dependency == "function") {
          return dependency();
        } else {
          return dependency.toObject();
        }
      }};
    }

    if (this.dependencyIsValid(d)) {
      this.dependencies.push(d);
    }

    return d;
  }

  hasDependency(model) {
    return this.indexOfDependency(model) != -1;
  }

  indexOfDependency(model) {
    if (typeof model == "string") {
      return this.dependencies.findIndex(m => m.model.name == model);
    }
    return this.dependencies.findIndex(m => m.model == model);
  }

  dependencyIsValid(dependency) {
    return !!(dependency.model && 
      !this.hasDependency(dependency.model) && 
      dependency.model != this);
  }

  removeDependency(model) {
    var index = this.indexOfDependency(model);

    if (index != -1) {
      var dependency = this.dependencies[index];

      if (dependency.model.removeDependent) {
        dependency.model.removeDependent(this);
      }

      this.dependencies.splice(index, 1);
      return dependency;
    }
  }

  resolveDependency(dependency) {
    return dependency.func.apply(this, dependency.args);
  }

  /* DEPENDENT MANAGEMENT */

  addDependent(model) {
    if (!this.hasDependent(model)) {
      this.dependents.push(model);
    }
  }

  hasDependent(model) {
    return this.dependents.indexOf(model) != -1;
  }

  removeDependent(model) {
    if (this.hasDependent(model)) {
      this.dependents.splice(this.dependents.indexOf(model), 1);
    }
  }

  crunch() {
    this.value = this.dependencies.reduce((sum, dependency) => {
      return this.parseValue(functional.applyModifier(sum, this.resolveDependency(dependency)));
    }, this.options.defaultValue);
  }
};
