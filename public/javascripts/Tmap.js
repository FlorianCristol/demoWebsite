/*
*	@author Florian Cristol
* Modified for terrain generation...
*The size of the array is of a number which is a power of 2 +1
* example: 65*65 129*129 etc
*/
if(typeof TERRAIN === 'undefined'){
	var TERRAIN = { REVISION: '3'};
}


TERRAIN.Map = function(sizeX, sizeY){
	this.maxX = sizeX;
	this.maxY = sizeY;
	this.size = this.maxX * this.maxY;
	this.arr = new Array(this.maxX * this.maxY);
	this.upArr = new Array(this.maxX * this.maxY);
	this.initialise();
}
TERRAIN.Map.prototype.getUp = function(x,y){
	return this.upArr[x + y * this.maxX];
}
TERRAIN.Map.prototype.getCell = function(x, y){
	if(x < 0 || x >= this.maxX || y < 0 || y >= this.maxY) return -1;
	return this.arr[x + y * this.maxX];
};
TERRAIN.Map.prototype.setUp = function(x, y){
	this.upArr[x + y * this.maxX] = -this.upArr[x + y * this.maxX];
}

TERRAIN.Map.prototype.setCell = function(x, y, value){
	if(x >= 0 && x < this.maxX && y >= 0 && y < this.maxY) {
	this.arr[x + y * this.maxX] = value;
}
};

TERRAIN.Map.prototype.getLength = function(){
	return this.size;
};

TERRAIN.Map.prototype.initialise = function(){

	for(var i  = 1 , maxI = this.maxX-1; i < maxI ; i++ ){
		for(var j = 1 , maxJ = this.maxY-1; j < maxJ; j++){

				this.upArr[i+j*this.maxX] = 1;



			}
		}
	
	
};

TERRAIN.Map.prototype.clearIt = function(){
	for(var i = 0 , max = this.size ; i < max ; i++){
		this.arr[i] = 0;
	}
};