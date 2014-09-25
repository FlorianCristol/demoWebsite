/*
*	@author Florian Cristol
* map stocking conway grid
*/
if(typeof CONWAY === 'undefined'){
	var CONWAY = { REVISION: '3'};
}

function Map(sizeX, sizeY){
	this.maxX = sizeX;
	this.maxY = sizeY;
	this.size = this.maxX * this.maxY;
	this.arr = new Array(this.maxX * this.maxY);
	this.initialise();
}

Map.prototype.getCell = function(x, y){
	return this.arr[x + y * this.maxX];
};

Map.prototype.setCell = function(x, y, value){
	this.arr[x + y * this.maxX] = value;
};

Map.prototype.getLength = function(){
	return this.size;
};

Map.prototype.initialise = function(){

	for(var i  = 1 , maxI = this.maxX-1; i < maxI ; i++ ){
		for(var j = 1 , maxJ = this.maxY-1; j < maxJ; j++){
			if(Math.random()*100 <25){
				this.setCell(i,j,1);
			}
			else{
				this.setCell(i,j,0);
			}
		}
	}
};

Map.prototype.clearIt = function(){
	for(var i = 0 , max = this.size ; i < max ; i++){
		this.arr[i] = 0;
	}
};