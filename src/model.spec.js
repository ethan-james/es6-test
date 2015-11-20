'use strict';

import {Model} from "./bootstrap";
import functional from "./functional";

describe('Model', function () {

  it('should do something', function () {
    expect(!!Model).toBe(true);
  });

  it("should initialize with an empty value", function () {
    var model = Model.create();
    expect(model.toObject()).toEqual(0);
  });

  it("should accept a value", function () {
    var model = Model.create(1);
    expect(model.toObject()).toEqual(1);
  });

  it("can have a name", function () {
    var model = Model.create(0, "test");
    expect(model.name).toEqual("test");
  });

  it("can change its name", function () {
    var model = Model.create(0, "test");
    model.name = "new";
    expect(model.name).toEqual("new");
  });

  it("can have options", function () {
    var model = Model.create(0, "test", { defaultValue : 17, foo : "bar" });
    expect(model.options).toEqual({ defaultValue : 17, foo : "bar" });
  });

  it("can return a string", function () {
    expect(Model.create(7, "a").toString()).toEqual("7");
  });

  it("should update its value", function () {
    var model = Model.create(0);
    model.set(2);
    expect(model.toObject()).toEqual(2);
  });

  it("should refuse to update a bad value", function () {
    var model = Model.create(1);
    model.set("asdf");
    expect(model.toObject()).toEqual(1);
  });

  it("should find the index of a dependency", function () {
    var model = Model.create(0, "1"),
        model2 = Model.create(1, "2"),
        model3 = Model.create(2, "3");

    model.addDependency(model2);
    model.addDependency(model3);
    expect(model.indexOfDependency(model3)).toEqual(1);
    expect(model.indexOfDependency("2")).toEqual(0);
    expect(model.indexOfDependency("4")).toEqual(-1);
  });

  it("should take dependencies", function () {
    var model = Model.create(0);
    model.addDependency(Model.create(0));
    expect(model.dependencies.length).toEqual(1);
  });

  it("should take functions as dependencies", function () {
    var model = Model.create(0);
    model.addDependency(function () { return "+1"; });
    expect(model.dependencies.length).toEqual(1);
  });

  it("should take a Model with the dependency", function () {
    var model = Model.create(0),
        model2 = Model.create(1, "2");

    model.addDependency(model2);
    expect(model.dependencies.length).toEqual(1);

    model.addDependency(model2);
    expect(model.dependencies.length).toEqual(1);

    model.addDependency(model);
    expect(model.dependencies.length).toEqual(1);
  });

  it("should take a dependency object", function () {
    var model = Model.create(2),
        model2 = Model.create(1),
        dependency = { args : [], model : model2, func : function () {
          return functional.stringModifier(model2.toObject());
        }};

    model.addDependency(dependency);
    expect(model.dependencies.length).toEqual(1);
  });

  it("should assess the validity of dependencies", function () {
    var model = Model.create(2);
    expect(model.dependencyIsValid({})).toBe(false);
  });

  it("should remove dependencies", function () {
    var model = Model.create(0),
        model2 = Model.create(0);

    model.addDependency(model2);
    expect(model.dependencies.length).toEqual(1);

    model.removeDependency(model2);
    expect(model.dependencies.length).toEqual(0);

    model.removeDependency(model2);
    expect(model.dependencies.length).toEqual(0);
  });

  it("should dealloc", function () {
    var model = Model.create(0),
        model2 = Model.create(0, "2");

    model.addDependency(model2);
    expect(model.dependencies.length).toEqual(1);

    model.dealloc();
    expect(model.dependencies.length).toEqual(0);
  });

  it("should return true when it has a dependency", function () {
    var model = Model.create(0),
        model2 = Model.create(1, "2"),
        model3 = Model.create(2, "3");

    model.addDependency(model2);
    expect(model.hasDependency(model2)).toBeTruthy();
    expect(model.hasDependency(model3)).toBeFalsy();
    expect(model.hasDependency("3")).toBeFalsy();
  });

  it("should add a dependent", function () {
    var model = Model.create(0),
        model2 = Model.create(1);

    model.addDependent(model2);
    expect(model.dependents.length).toEqual(1);

    model.addDependent(model2);
    expect(model.dependents.length).toEqual(1);
  });

  it("should return true when it has a dependent", function () {
    var model = Model.create(0),
        model2 = Model.create(1),
        model3 = Model.create(2);

    model.addDependent(model3);
    expect(model.hasDependent(model3)).toBeTruthy();
    expect(model.hasDependent(model2)).toBeFalsy();
  });

  it("should remove a dependent", function () {
    var model = Model.create(0),
        model2 = Model.create(1);

    model.addDependent(model2);
    expect(model.dependents.length).toEqual(1);

    model.removeDependent(model2);
    expect(model.dependents.length).toEqual(0);
  });

  it("should do some crunching", function () {
    var model = Model.create(1),
        model2 = Model.create(2);

    model.addDependency(model2);
    model.addDependency(function (model) { return "+3"; });

    model.crunch();
    expect(model.toObject()).toEqual(5);
  });

  it("should print its name", function () {
    var model = Model.create(0, "blah");
    expect(model.name).toEqual("blah");
  });
});
