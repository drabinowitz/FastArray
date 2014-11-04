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

  it('should have methods "getSet", "shift", "unshift", "push", "pop", "each", and "returnArray"', function () {
    expect(fastArray.getSet).to.be.a('function');
    expect(fastArray.shift).to.be.a('function');
    expect(fastArray.unshift).to.be.a('function');
    expect(fastArray.push).to.be.a('function');
    expect(fastArray.pop).to.be.a('function');
    expect(fastArray.each).to.be.a('function');
    expect(fastArray.returnArray).to.be.a('function');
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

  it('should be able to execute a callback on every element passing in the element value, index, and FastArray', function(){

    fastArray.unshift(2);
    fastArray.unshift(1);
    fastArray.push(3);

    var result = [];

    fastArray.each(function(value,index,fArr){

      result.push([value,index,fArr]);

    });

    expect(result[0][0]).to.equal(1);
    expect(result[0][1]).to.equal(0);
    expect(result[0][2]).to.equal(fastArray);
    expect(result[1][0]).to.equal(2);
    expect(result[1][1]).to.equal(1);
    expect(result[1][2]).to.equal(fastArray);
    expect(result[2][0]).to.equal(3);
    expect(result[2][1]).to.equal(2);
    expect(result[2][2]).to.equal(fastArray);
  });

  it('should be able to execute a callback on a select range of indexes within the fastArray using each', function(){

    fastArray = new FastArray([1,'2',false,{},4]);
    var result = [];

    fastArray.each(function(value){

      result.push(value);

    },1,fastArray.length - 1);

    expect(result[0]).to.equal('2');
    expect(result[1]).to.equal(false);
    expect(result[2]).to.eql({});

  });

  it('should loop through the array in reverse if start is greater than end', function(){

    fastArray.push(2);
    fastArray.push(3);
    fastArray.unshift(1);

    var result = [];

    fastArray.each(function(value){

      result.push(value);

    },fastArray.length - 1,-1);

    expect(result).to.eql([3,2,1]);

  });

  it('should be able to return an standard array from the inputted start inclusive to end exclusive', function(){

    fastArray.push(1);
    fastArray.push(2);
    fastArray.unshift(3);

    expect(fastArray.returnArray()).to.eql([3,1,2]);
    expect(fastArray.returnArray(1,fastArray.length - 1)).to.eql([1]);

  });

});
