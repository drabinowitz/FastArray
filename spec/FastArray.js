/* global FastArray, describe, it, expect, should */

describe('FastArray()', function () {
  'use strict';

  var fastArray;

  beforeEach(function(){

    fastArray = new FastArray();

  });

  it('should exist', function () {
    expect(fastArray).to.be.a('object');

  });

  it('should have methods "getSet", "set", "shift", "unshift", "push", and "pop"', function () {
    expect(fastArray.getSet).to.be.a('function');
    expect(fastArray.shift).to.be.a('function');
    expect(fastArray.unshift).to.be.a('function');
    expect(fastArray.push).to.be.a('function');
    expect(fastArray.pop).to.be.a('function');
  });

  it('should be able to start with a base array', function() {
    fastArray = new FastArray([1,2,3]);
    expect(fastArray.getSet(0)).to.equal(1);
    expect(fastArray.getSet(1)).to.equal(2);
    expect(fastArray.getSet(2)).to.equal(3);
  });

  it('should have a correct length property', function() {
    fastArray = new FastArray([1,2,3]);
    expect(fastArray.length).to.equal(3);
    fastArray.push(4);
    expect(fastArray.length).to.equal(4);
    fastArray.unshift(5);
    expect(fastArray.length).to.equal(5);
    fastArray.pop();
    expect(fastArray.length).to.equal(4);
    fastArray.shift();
    expect(fastArray.length).to.equal(3);
  });

  it('should be able to retrieve pushed values', function () {
    fastArray.push(0);
    expect(fastArray.getSet(0)).to.equal(0);
    fastArray.push('this');
    expect(fastArray.getSet(1)).to.equal('this');
  });

  it('should be able to modify a value', function() {
    fastArray.push(true);
    expect(fastArray.getSet(0)).to.equal(true);
    fastArray.getSet(0,false);
    expect(fastArray.getSet(0)).to.equal(false);
  });

  it('should be able to shift unshift and push values', function() {
    fastArray.push(0);
    expect(fastArray.getSet(0)).to.equal(0);
    fastArray.unshift(1);
    expect(fastArray.getSet(0)).to.equal(1);
    fastArray.push(2);
    fastArray.shift();
    expect(fastArray.getSet(0)).to.equal(0);
    fastArray.shift();
    expect(fastArray.getSet(0)).to.equal(2);
    fastArray.unshift(1);
    expect(fastArray.getSet(0)).to.equal(1);
    expect(fastArray.getSet(1)).to.equal(2);
  });

  it('pop and shift should return values', function() {

    fastArray.push(0);
    fastArray.push(1);
    fastArray.push(2);
    expect(fastArray.pop()).to.equal(2);
    expect(fastArray.shift()).to.equal(0);

  });

  it('should be able to unshift an empty array', function() {

    fastArray.unshift(0);
    expect(fastArray.length).to.equal(1);
    expect(fastArray.getSet(0)).to.equal(0);
    fastArray.unshift(1);
    expect(fastArray.getSet(0)).to.equal(1);
    expect(fastArray.getSet(1)).to.equal(0);
    fastArray.push(10);
    expect(fastArray.getSet(fastArray.length - 1)).to.equal(10);
    fastArray.push(20);
    expect(fastArray.getSet(fastArray.length - 1)).to.equal(20);
    expect(fastArray.shift()).to.equal(1);
    expect(fastArray.shift()).to.equal(0);

  });

  // Add more assertions here
});
