/*
*	@author Florian Cristol
* Modified for terrain generation...
*The size of the array is of a number which is a power of 2 +1
* example: 65*65 129*129 etc
*/
if(typeof TRACER === 'undefined'){
	var TRACER = { REVISION: '4'};
}


TRACER.Map = function(){
	this.maxX = 16;
	this.maxY = 8;
	this.size = this.maxX * this.maxY;
	this.arr = new Array(this.size);
	this.initialise();
}

TRACER.Map.prototype.getCell = function(x, y){
	if(x < 0 || x >= this.maxX || y < 0 || y >= this.maxY) return -1;
	return this.arr[x + y * this.maxX];
};
TRACER.Map.prototype.setCell = function(x, y, value){
	if(x >= 0 && x < this.maxX && y >= 0 && y < this.maxY) {
	this.arr[x + y * this.maxX] = value;
	}
};

TRACER.Map.prototype.getLength = function(){
	return this.size;
};
TRACER.Map.prototype.getMaxX = function(){
	return this.maxX;
}
TRACER.Map.prototype.getMaxY = function(){
	return this.maxY;
}
TRACER.Map.prototype.initialise = function(){
	this.arr = [
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
	1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,
	1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,
	1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
	]
	
};

TRACER.Map.prototype.clearIt = function(){
	for(var i = 0 , max = this.size ; i < max ; i++){
		this.arr[i] = 0;
	}
};