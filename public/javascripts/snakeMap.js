
if(typeof SNAKE === 'undefined'){
	SNAKE = {REVISION: 1};
}


SNAKE.Map = function(sizeX, sizeY){
	this.maxX = sizeX;
	this.maxY = sizeY;
	this.size = this.maxX * this.maxY;
	this.arr = new Array(this.maxX * this.maxY);
	this.food = [];
	this.initialise();
}

SNAKE.Map.prototype.getCell = function(x, y){
	return this.arr[x + y * this.maxX];
};

SNAKE.Map.prototype.setCell = function(x, y, value){
	this.arr[x + y * this.maxX] = value;
	if(value === "food"){
		this.food.push({'x':x,'y':y});
	}

};
SNAKE.Map.prototype.setFood = function(food){
	this.food = food;
};
SNAKE.Map.prototype.getLength = function(){
	return this.size;
};
SNAKE.Map.prototype.foodEaten = function(position){
	for(var i = 0 ,max = this.food.length; i < max ; i++){
		if(this.food[i].x === position.x && this.food[i].y === position.y){
			this.setCell(this.food[i].x,this.food[i].y,"empty");
			this.food.splice(i,1);

		}
	}
};
SNAKE.Map.prototype.getMap = function(){
	return this.arr;
}
SNAKE.Map.prototype.initialise = function(){
	for(var i = 0 , max = this.arr.length; i<max; i++){
		this.arr[i] = "empty";
	}
};
SNAKE.Map.prototype.getMapGrid = function(){
	return this.arr;
}
SNAKE.Map.prototype.getFood = function(){
	return this.food;
}
SNAKE.Map.prototype.clearIt = function(){
	for(var i = 0 , max = this.size ; i < max ; i++){
		this.arr[i] = 0;
	}
};