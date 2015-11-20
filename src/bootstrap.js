'use strict';

import Factory from "./factory";
import Model from "./model";
import Template from "./template";
import Employee from "./employee";

Factory.add(Model, "Model");
Factory.add(Template, "Template");
Factory.add(Employee, "Employee");

Factory.Mixin = {
  StringValue : {
    isValid(value) {
      return typeof value == "string";
    },

    parseValue(value) {
      return value;
    }
  }
};

export default Factory;