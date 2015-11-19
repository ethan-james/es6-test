'use strict';

import Factory from "./factory"

describe('Factory', function () {

  it('should do something', function () {
    expect(!!Factory).toBe(true);
  });

  it('should create a basic object', function () {
    expect(Factory.create()).toEqual({});
  });

  it('should accept a new model', function () {
    Factory.add(function () { this.test = "woohoo"; }, "Test");

    let test = Factory.Test.create();
    expect(test.test).toEqual("woohoo");
  });

  it("should instantiate a model the same way regardless of how it's invoked", function () {
    Factory.add(function () { this.test = "woohoo"; }, "Test");

    let test = Factory.Test();
    expect(test.test).toEqual("woohoo");
  });

  it("should instantiate a model the same way when new is used", function () {
    Factory.add(function () { this.test = "woohoo"; }, "Test");

    let test = new Factory.Test();
    expect(test.test).toEqual("woohoo");
  });

  it("should mix in a mixin", function () {
    let model = Factory.create(1, "test", {}, { mixin : 4 });
    expect(model.mixin).toEqual(4);
  });

  it("should properly bind 'this' in a mixin", function () {
    let model = Factory.create(1, "test", {}, { mixin() { return this.test; }});

    model.test = 7;
    expect(model.mixin()).toEqual(7);
  });
});