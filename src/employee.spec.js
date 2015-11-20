'use strict';

import {Model, Template, Employee, Mixin} from "./bootstrap";

describe("Employee", function () {
  var employee;

  beforeEach(function () {
    employee = Employee.create({
      salary : Model.create(0, "salary"),
      title : Model.create("", "title", { defaultValue : "" }, Mixin.StringValue)
    });
  });

  it("should do something", function () {
    expect(!!Employee).toBe(true);
    expect(!!employee).toBe(true);
  });

  it("should furnish an object full of its properties' values", function () {
    expect(employee.toObject()).toEqual({ salary : 0, title : "" });
  });
});