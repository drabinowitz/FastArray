FastArray = function(array){
  this._storage = array || [];
  this._shift = 0;
  this._spliceAt = [];
}

FastArray.prototype._find = function(index){

  return index + this._shift;

}

FastArray.prototype.get = function(index){

  return this._storage[ this._find(index) ];

};

FastArray.prototype.set = function(index,value){

  return this._storage[ this._find(index) ] = value;

};

FastArray.prototype.shift = function(){

  this.length--;

  var result = this.get(0);

  delete this._storage[ this._find(0) ];

  this._shift++;

  return result;

};

FastArray.prototype.unshift = function(value){

  if (this._shift === 0) {

    Array.prototype.unshift.call(this._storage,value);

  } else {

    this.length++;

    this._shift--;

    this.set(0,value);

  }

};

FastArray.prototype.push = function(value){

  return this._storage.push(value);

};

FastArray.prototype.pop = function(){

  return this._storage.pop();

};