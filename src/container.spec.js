'use strict';

import {Model, Template, Container, Mixin} from "./bootstrap";

describe("Container", function () {
  var employee;

  beforeEach(function () {
    employee = Container.create({
      salary : Model.create(0, "salary"),
      title : Model.create("", "title", { defaultValue : "" }, Mixin.StringValue)
    });
  });

  it("should do something", function () {
    expect(!!Container).toBe(true);
    expect(!!employee).toBe(true);
  });

  it("should furnish an object full of its properties' values", function () {
    expect(employee.toObject()).toEqual({ salary : 0, title : "" });
  });
});