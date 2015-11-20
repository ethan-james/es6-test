'use strict';

import functional from "./functional";

describe("functional", function () {

  it("should do something", function () {
    expect(!!functional).toBe(true);
  });

  it("should correctly identify a modifier", function () {
    expect(functional.isModifier("+3")).toBe(true);
    expect(functional.isModifier("-4")).toBe(true);
  });

  it("should reject non-modifiers", function () {
    expect(functional.isModifier(+3)).toBe(false);
    expect(functional.isModifier(-4)).toBe(false);
    expect(functional.isModifier("3")).toBe(false);
    expect(functional.isModifier({"a" : 1, "b" : 2})).toBe(false);
    expect(functional.isModifier()).toBe(false);
  });

  it("should correctly identify an array", function () {
    expect(functional.isArray([1, 2, 3])).toBe(true);
    expect(functional.isArray([])).toBe(true);
  });

  it("should reject non-arrays", function () {
    expect(functional.isArray({"a" : 3, "b" : 2})).toBe(false);
    expect(functional.isArray(-4)).toBe(false);
    expect(functional.isArray("321")).toBe(false);
    expect(functional.isArray()).toBe(false);
  });

  it("should correctly identify an object", function () {
    expect(functional.isObject({"a" : 3, "b" : 2})).toBe(true);
    expect(functional.isObject({})).toBe(true);
  });

  it("should reject non-objects", function () {
    expect(functional.isObject([3, 2, 1])).toBe(false);
    expect(functional.isObject(-4)).toBe(false);
    expect(functional.isObject("321")).toBe(false);
    expect(functional.isObject()).toBe(false);
  });

  it("should correctly identify empty values", function () {
    expect(functional.isEmpty(0)).toBe(true);
    expect(functional.isEmpty("")).toBe(true);
    expect(functional.isEmpty([])).toBe(true);
    expect(functional.isEmpty({})).toBe(true);
    expect(functional.isEmpty(null)).toBe(true);
    // need to consider empty objects with prototypes, but I think I
    // probably want them to return false
    // expect(functional.isEmpty(Object.create({"a" : 1}))).toBe(true);
    expect(functional.isEmpty()).toBe(true);
  });

  it("should reject non-empty values", function () {
    expect(functional.isEmpty(true)).toBe(false);
    expect(functional.isEmpty(false)).toBe(false);
    expect(functional.isEmpty(-3)).toBe(false);
    expect(functional.isEmpty("0")).toBe(false);
    expect(functional.isEmpty("a")).toBe(false);
    expect(functional.isEmpty(function () {})).toBe(false);
    expect(functional.isEmpty([0])).toBe(false);
    expect(functional.isEmpty({ "a" : 0 })).toBe(false);
  });

  it("should apply modifiers to numbers", function () {
    expect(functional.applyModifier(4, "+2")).toBe(6);
    expect(functional.applyModifier(4, "-4")).toBe(0);
  });

  it("should apply modifiers to modifiers", function () {
    expect(functional.applyModifier("+3", "-3")).toBe("");
    expect(functional.applyModifier("+3", "+2")).toBe("+5");
    expect(functional.applyModifier("+2", "-3")).toBe("-1");
  });

  it("should ignore an empty modifier", function () {
    expect(functional.applyModifier(3, "")).toBe(3);
  })

  it("should pass the modifier through when the original is not set", function () {
    expect(functional.applyModifier(0, "-4")).toBe("-4");
    expect(functional.applyModifier(null, "+3")).toBe("+3");
  });

  it("should correctly form string modifiers", function () {
    expect(functional.stringModifier(0)).toBe("");
    expect(functional.stringModifier(-4)).toBe("-4");
    expect(functional.stringModifier(3)).toBe("+3");
  });

  it("should reject non-numeric string modifiers", function () {
    expect(functional.stringModifier([])).toBe("");
    expect(functional.stringModifier({})).toBe("");
    expect(functional.stringModifier("abc")).toBe("");
  });

  it("should parse ints and floats", function () {
    expect(functional.parseNumber(-2)).toBe(-2);
    expect(functional.parseNumber(3)).toBe(3);
    expect(functional.parseNumber(0)).toBe(0);
    expect(functional.parseNumber(0.0)).toBe(0.0);
    expect(functional.parseNumber(3.5)).toBe(3.5);
  });

  it("should parse numbers from strings", function () {
    expect(functional.parseNumber("-2")).toBe(-2);
    expect(functional.parseNumber("3")).toBe(3);
    expect(functional.parseNumber("0")).toBe(0);
    expect(functional.parseNumber("0.0")).toBe(0.0);
    expect(functional.parseNumber("3.5")).toBe(3.5);
  });

  it("should parse numbers from fraction strings", function () {
    expect(functional.parseNumber("-1/2")).toBe(-0.5);
    expect(functional.parseNumber("3/4")).toBe(0.75);
    expect(functional.parseNumber("3/0")).toBe(Infinity);
    expect(functional.parseNumber("0/3")).toBe(0);
  });

  it("should return NaN when passed a non-string", function () {
    expect(functional.parseNumber([1, 2, 3])).toBeNaN();
    expect(functional.parseNumber("abc")).toBeNaN();
    expect(functional.parseNumber({ "a" : 1, "b" : 2 })).toBeNaN();
    expect(functional.parseNumber(null)).toBeNaN();
    expect(functional.parseNumber()).toBeNaN();
  });

});