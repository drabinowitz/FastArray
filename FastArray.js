FastArray = function(array){

  if (Array.isArray(array)){

    this._storage = array;
    this.length = array.length;
    delete this._storage.push;
    delete this._storage.pop;
    delete this._storage.shift;
    delete this._storage.unshift;
    delete this._storage.slice;
    delete this._storage.splice;

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

FastArray.prototype.each = function(callback,start,end){

  var holder;
  var i;

  start = start === +start ? Math.max(Math.min(start,this.length - 1),0) : 0;

  end = end === +end ? Math.max(Math.min(end,this.length),-1) : this.length;

  if(end > start){

    for ( i = start; i < end; i++ ){

      callback(this.getSet(i),i,this);

    }

  } else if (start > end){

    for ( i = start; i > end; i-- ){

      callback(this.getSet(i),i,this);

    }    

  }

};

FastArray.prototype.returnArray = function(start,end){

  var result;

  if (this._shift === 0){

    result = this._storage.slice(start,end);

  } else {

    result = [];

    this.each(function(value){

      result.push(value);

    },start,end);

  }

  return result;

};