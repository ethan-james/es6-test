'use strict';

export default {
  first(arr) {
    return (this.isArray(arr) && !this.isEmpty(arr)) ? arr.slice(0, 1).pop() : null;
  },

  last(arr) {
    return (this.isArray(arr) && !this.isEmpty(arr)) ? arr.slice(-1).pop() : null;
  },

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
      if (obj.hasOwnProperty(key)) {
        return false;
      }
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

  stringModifier(mod) {
    if (!mod || !parseInt(mod)) {
      return "";
    }

    if (mod < 0) {
      return "" + mod;
    }

    return "+" + parseInt(mod);
  },

  tokenize(str) {
    if (this.isEmpty(str)) {
      return [];
    }
    return str.split(/,(?=(?:[^\)]|\([^\)]*\))*$)/).map(item => item.trim());
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
  }
}