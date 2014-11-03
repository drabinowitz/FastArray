FastArray = function(array){

  if (Array.isArray(array)){

    this._storage = array;
    this.length = array.length;

  } else {

    this._storage = [];
    this.length = 0;
    
  }

  this._shift = 0;
  this._unshift = [];
  this._spliceAt = [];

}

FastArray.prototype._find = function(index){

  return index + this._shift;

}

FastArray.prototype.getSet = function(index,value){

  var result = value;

  if (index < this.length){

    if (index >= this._unshift.length){

      if (arguments.length > 1){

        this._storage[ this._find(index) ] = value;

      } else {

        result = this._storage[ this._find(index) ];

      }

    } else {

      if (arguments.length > 1){

        this._unshift[ this._unshift.length - 1 - index ] = value;

      } else {

        result = this._unshift[ this._unshift.length - 1 - index ];

      }

    }
    
  }

  return result;

};

FastArray.prototype.shift = function(){

  var result;

  if (this.length > 0){

    this.length--;

    if (this._shift >= 0){

      result = this.getSet(0);

      delete this._storage[ this._find(0) ];

    } else {

      result = this._unshift.pop();

    }

    this._shift++;

  }

  return result;

};

FastArray.prototype.unshift = function(value){

  this.length++;
  
  this._shift--;

  if (this._shift >= 0) {

    return this.getSet(0,value);

  } else {

    return this._unshift.push(value);

  }

};

FastArray.prototype.push = function(value){

  this.length++;

  return this._storage.push(value);

};

FastArray.prototype.pop = function(){

  if(this.length > 0){

    this.length--;

    if (this._storage.length > 0){

      return this._storage.pop();

    } else {

      return this._unshift.unshift();

    }

  }

};