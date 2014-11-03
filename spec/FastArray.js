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

  it('should have methods "get", "set", "shift", and "unshift"', function () {
    expect(fastArray.get).to.be.a('function');
    expect(fastArray.set).to.be.a('function');
    expect(fastArray.shift).to.be.a('function');
    expect(fastArray.unshift).to.be.a('function');
  });

  it('should be able to retrieve pushed values', function () {
    fastArray.push(0);
    expect(fastArray.get(0)).to.equal(0);
    fastArray.push('this');
    expect(fastArray.get(1)).to.equal('this');
  });

  it('should be ablle to modify a value', function() {
    fastArray.push(true);
    expect(fastArray.get(0)).to.equal(true);
    fastArray.set(0,false);
    expect(fastArray.get(0)).to.equal(false);
  });

  it('should be able to shift and unshift values', function() {
    fastArray.push(0);
    expect(fastArray.get(0)).to.equal(0);
    fastArray.unshift(1);
    expect(fastArray.get(0)).to.equal(1);
    fastArray.push(2);
    fastArray.shift();
    expect(fastArray.get(0)).to.equal(0);
    fastArray.shift();
    expect(fastArray.get(0)).to.equal(2);
    fastArray.unshift(1);
    expect(fastArray.get(0)).to.equal(1);
    expect(fastArray.get(1)).to.equal(2);
  });

  // Add more assertions here
});
