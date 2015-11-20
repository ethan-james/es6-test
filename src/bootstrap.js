'use strict';

import Factory from "./factory";
import Model from "./model";
import Template from "./template";
import Container from "./container";

Factory.add(Model, "Model");
Factory.add(Template, "Template");
Factory.add(Container, "Container");

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