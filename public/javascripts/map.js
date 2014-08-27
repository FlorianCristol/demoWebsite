/*
*	@author Florian Cristol
*/
if(typeof CONWAY === 'undefined'){
	var CONWAY = { REVISION: '3'};
}


function Map(size, max){
	this.max = max;
	this.arr = new Array(size);
	this.initialise();
}

Map.prototype.getCell = function(x, y){
	return this.arr[x + y * this.max];
};

Map.prototype.setCell = function(x, y, value){
	this.arr[x + y * this.max] = value;
};

Map.prototype.getLength = function(){
	return this.max;
};

Map.prototype.initialise = function(){

	for(var i = 0, max = this.max*this.max; i < max; i++){

		if(Math.random()*100 <25){
			this.arr[i] = 1;
		}
		else{
			this.arr[i] = 0;
		}
	}
	
};

Map.prototype.clearIt = function(){
	for(var i = 0 , max = this.max * this.max ; i < max ; i++){
		this.arr[i] = 0;
	}
};