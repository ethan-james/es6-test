'use strict';

import _ from "lodash";

export default {

  isModifier(modifier) {
    return typeof modifier == "string" && /^[+-]/.test(modifier);
  },

  isArray(value) {
    return typeof value === "object" && typeof value.length === "number";
  },

  isObject(value) {
    return typeof value === "object" && typeof value.length === "undefined" && value !== null;
  },

  isEmpty(obj) {
    if (obj === true || obj === false) {
      return false;
    }

    if (!obj) {
      return true;
    }

    if (typeof obj == "number" || obj.length || typeof obj == "function") {
      return false;
    }

    for (var key in obj) {
      // probably not empty if it has properties in its prototype chain
      return false;
    }

    return true;
  },

  applyModifier(original, modifier) {
    if (original && this.isModifier(modifier)) {
      if (this.isModifier(original)) {
        return this.stringModifier(parseInt(original) + parseInt(modifier));
      }
      
      return parseInt(original) + parseInt(modifier);
    }

    if (!parseInt(modifier)) {
      return original;
    }

    return modifier;
  },

  applyModifiers(original, modifiers, opts) {
    var obj = Object.assign({}, original);

    if (modifiers === null) {
      return {};
    }

    _.forOwn(modifiers, (value, key) => {
      if (this.isModifier(value)) {
        obj[key] = this.applyModifier(obj[key], value);
      } else {
        if (value && typeof value == "object") {
          obj[key] = this.applyModifiers(obj[key] || {}, value);
        } else {
          obj[key] = value;
        }
      }

      if (this.isEmpty(obj[key]) && !this.isEmpty(original[key])) {
        delete obj[key];
      }
    });

    return obj;
  },

  stringModifier(mod) {
    if (!mod || !parseInt(mod)) {
      return "";
    }

    if (mod < 0) {
      return "" + mod;
    }

    return "+" + parseInt(mod);
  },

  parseNumber(number) {
    switch (typeof number) {
      case "number":
        return number;
      case "object":
        return NaN;
      case "string":
        var match = number.match(/([0-9-]+)\/([0-9-]+)/);
        if (match) {
          return match[1] / match[2];
        }
      default:
        return parseFloat(number);
    }
  },

  objectMap(obj, func, context) {
    return Object.keys(obj).reduce((accumulator, key) => {
      return this.applyModifiers(accumulator, func.call(context, obj[key], key));
    }, {});
  }
}