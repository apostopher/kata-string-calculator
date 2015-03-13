"use strict";

var expect = require('chai').expect;
var add = require('../src/index');

describe('string calculator', function () {

  it('should return 0 for empty input', function () {
    expect(add("")).to.equal(0);
  });

  it('should return a number for single number input', function () {
    expect(add("1")).to.equal(1);
  });

  it('should add two numbers separated by delimiter', function () {
    expect(add("1,2")).to.equal(3);
  });

  it('should add many numbers separated by delimiter', function () {
    expect(add("1,2,3")).to.equal(6);
  });

  it('should treat new line character as delimiter', function () {
    expect(add("1\n2,3")).to.equal(6);
  });

  it('should support custom delimiters', function () {
    expect(add("//;\n1;2")).to.equal(3);
  });

  it('should ignore negative numbers and throw an error', function () {
    expect(function () {
      return add("1,-2,4");
    }).to.throw(Error);
  });

  it('should ignore numbers more than 1000', function () {
    expect(add("1,2000,4")).to.equal(5);
  });

  it('should support multiple length delimiter', function () {
    expect(add("//[**]\n1**2**3")).to.equal(6);
  });

  it('should support multiple delimiters', function () {
    expect(add("//[*][?]\n1*2?3")).to.equal(6);
  });

  // This really doesn't make any sense. but for fun!
  it('should support number as a delimiter', function () {
    expect(add("//5\n15253")).to.equal(6);
  });
});

