/*
* @author Florian Cristol
* Dependency : CONWAY.Map
*/
/*if(typeof CONWAY === 'undefined'){
	var CONWAY = { REVISION: '3'};
}*/


function GameOfLife(w,h,context2,precision,bounds){
	//this.ctx = context;
	//console.log("ctx2"+this.ctx);
	this.width = w;
	this.height = h;
	this.runningBool = true;
	this.precision = precision;
	this.boundingClientRect = bounds;
	this.ctx = context2;
	this.userclicking = false;
	//console.log(this.boundingClientRect);
	//size+1 et max-1 nous permet d'avoir une bordure de cells
	//Qui n'entrent pas dans les calculs d'une génération à l'autre
	//Ce qui évite de checker à chaque fois si on est au bord pour 
	//pour ne pas avoir de out of bounds array
	this.size = this.precision +1;
	this.cellSize = this.width/this.precision;
	this.maxX = this.size ;
	this.maxY = Math.floor(this.height/this.cellSize);
	console.log("Height: "+this.height+" cellsize:"+this.cellSize);
	console.log(this.maxY+" "+this.maxX);
	this.map = new Map(this.maxX, this.maxY);

	this.initialise();

	
	//requestAnimationFrame(this.gameLoop);
}
GameOfLife.prototype.initialise = function(){


	this.drawGrid(this.map);
		};
GameOfLife.prototype.restart = function(){
	this.map.initialise();
};

GameOfLife.prototype.clear = function(){
	this.map.clearIt();
	this.drawGrid();
};
GameOfLife.prototype.running = function(){
	return this.runningBool;
};
GameOfLife.prototype.update = function(){
	
	var newMap = new Map(this.maxX, this.maxY);
	for(var i = 1 , maxI = this.maxX -1; i < maxI ; i++){ 
		for(var j = 1 , maxJ = this.maxY -1; j < maxJ ; j++){
			var around = [[i-1, j-1],[i, j-1],[i+1, j-1],[i-1, j],[i+1, j],[i-1, j+1],[i,j+1],[i+1,j+1]];
			var aliveCells = 0;
			for(var k = 0, maxAround = around.length; k < maxAround; k++){
				if(this.map.getCell(around[k][0],around[k][1])===1){
					aliveCells++;
				}
			}
			if(this.map.getCell(i,j)===1){
				switch(true){
					case (aliveCells < 2):
						newMap.setCell(i,j,0);
						break;
					case (aliveCells <= 3):
						newMap.setCell(i,j,1);
						break;
					case (aliveCells > 3):
						newMap.setCell(i,j,0);
						break;
					default:
						newMap.setCell(i,j,0);
						break;
				}
			}else{
				if(aliveCells === 3){
					newMap.setCell(i,j,1);
				}
				else{
					newMap.setCell(i,j,0);
				}

			}
			

		}
	}
	this.map = newMap;
};

GameOfLife.prototype.giveLife = function(x,y){
	this.map.setCell(x,y,1);
};

GameOfLife.prototype.drawGrid = function(){

	this.clearGrid(this.ctx);
	this.ctx.fillStyle = 'rgb(0,0,255)';

	for(var i = 0 , maxI = this.maxX; i < maxI; i++){
		
		for(var j = 0 , maxJ = this.maxY; j < maxJ;j++){

			if(this.map.getCell(i,j) == 1){

				this.ctx.fillRect(i*this.cellSize,j*this.cellSize,this.cellSize,this.cellSize);

			}
		}
	}

};
GameOfLife.prototype.systemLoop = function(){
		this.update();
		this.drawGrid();
		

};
GameOfLife.prototype.clearGrid = function(){

	this.ctx.fillStyle = 'rgb(0,0,0)';

	this.ctx.fillRect(0,0,this.width,this.height);
};



GameOfLife.prototype.reloop = function(){

	window.requestAnimationFrame(this.gameLoop);



};	

GameOfLife.prototype.toggle = function(){
	if(this.runningBool){
		this.runningBool = false;
	}else{
		this.runningBool=true;
	}
};

GameOfLife.prototype.step = function(){
	this.update();
	this.drawGrid(this.map);
};




GameOfLife.prototype.userClick = function(event){
	

		var rect = this.boundingClientRect;
		var mousePositionX = event.clientX - rect.left;
		var mousePositionY = event.clientY - rect.top;
		var cellToGiveLife = this.getCellFromMousePosition(mousePositionX, mousePositionY);
		this.giveLife(cellToGiveLife[0],cellToGiveLife[1]);
		drawGrid(theGame.map);
	
}
GameOfLife.prototype.getCellFromMousePosition = function(mousePositionX, mousePositionY){
	var position = [Math.floor(mousePositionX/cellSize),Math.floor(mousePositionY/cellSize)];
	return position;
}
