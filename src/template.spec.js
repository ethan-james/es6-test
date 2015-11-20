'use strict';

import {Template} from "./bootstrap"

describe('Template', function () {

  it('should do something', function () {
    expect(!!Template).toBe(true);
  });

  it("should read an object", function () {
    var template = Template.create({ age : 16, friends : 6 });

    expect(template.value.age).toEqual(16);
    expect(template.value.friends).toEqual(6);
  });

  it("should merge objects", function () {
    var template = Template.create({ age : 16, friends : 6 });
    template.assign({ age : 12, weight : 18 });

    expect(template.toObject()).toEqual({ age : 12, friends : 6, weight : 18 });
  });

  it("should apply modifiers", function () {
    var template = Template.create({ age : 16, friends : 6 });
    template.assign({ age : "-2", friends : "+1", weight : "+2" });

    expect(template.toObject()).toEqual({ age : 14, friends : 7, weight : "+2" });
  });

  it("should apply a modifier to a modifier", function () {
    var template = Template.create({ age : "+4", friends : "+4" });
    template.assign({ age : "-1", friends : "+2" });

    expect(template.toObject()).toEqual({ age : "+3", friends : "+6" });
  });

  it("should override a modifier", function () {
    var template = Template.create({ age : "+4", friends : "+4" });
    template.assign({ age : 18 });

    expect(template.toObject()).toEqual({ age : 18, friends : "+4" });
  });

  it("should remove an attribute when it hits 0", function () {
    var template = Template.create({ age : 18, weight : -2, friends : "+2", fortitude : "+4" });
    template.assign({ age : "-4", weight : "+2", friends : "-2", fortitude : 0 });

    expect(template.toObject()).toEqual({ age : 14 });
  });

  it("should remove an attribute that is nulled", function () {
    var template = Template.create({ gear : { "Macbook" : true, "Swagway" : true }, immune : { "Fire" : true, "Electricity" : true }});
    template.assign({ immune : null, gear : { "Swagway" : null }});

    expect(template.toObject()).toEqual({ gear : { "Macbook" : true }});
  });
});
