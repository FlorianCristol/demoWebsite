

function Conway(precision){
	this.size = precision + 1;
	
	this.max  = this.size -1;
	this.map = new Map(this.size * this.size, this.max);
	this.map.initialise();
}
function Vector(x, y){
	this.x = x || 0;
	this.y = y || 0;
}

function Map(size, max){
	this.max = max;
	
	this.arr = new Array(size);
}
Map.prototype.getCell = function(x,y){
	
		return this.arr[x + y * this.max];
};
	
Map.prototype.setCell = function(x , y, value){
	
		this.arr[x + y * this.max] = value;
	
};
Map.prototype.getLength = function(){
	return this.max;
};
Map.prototype.initialise = function(){
	console.log('lol');
	for(var i = 0 , max = this.max*this.max; i < max ; i++){
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
}
Conway.prototype.restart = function(){
	this.map.initialise();
};
Conway.prototype.clear = function(){
	this.map.clearIt();
	drawGrid(this.map);
};
//On crée une nouvelle map de nos cellules. On évite les cellules aux extrémités 
//pour ne pas avoir a faire plein de if inutiles.
Conway.prototype.update = function(){
	var newMap = new Map(this.size * this.size, this.max);
	for(var i = 1 , maxI = this.max -1; i < maxI ; i++){ 
		for(var j = 1 , maxJ = this.max -1; j < maxJ ; j++){
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
Conway.prototype.giveLife = function(x,y){
	this.map.setCell(x,y,1);
	
};
function drawGrid(grid){
	clearGrid();
	ctx.fillStyle = 'rgb(0,0,255)';
	console.log('draw');
	for(var i = 0 , maxI = grid.getLength(); i < maxI; i++){

		for(var j = 0 , maxJ = grid.getLength(); j < maxJ;j++){
			if(grid.getCell(i,j) == 1){
				ctx.fillRect(i*cellSize,j*cellSize,cellSize,cellSize);
			}
			
			
		}
	}
}
function clearGrid(){
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0,0,width,height);
}
function userClick(event){

	var rect = display.getBoundingClientRect();
	var mousePosition = new Vector(event.clientX - rect.left, event.clientY - rect.top);
	
	
}
function gameLoop(){
	if(running === true){
		theGame.update();
		drawGrid(theGame.map);

	}
	reloop();
}
	//reloop();
function test(){
	if(running){
		running = false;
	}else{
		running=true;
	}
}
function step(){
	theGame.update();
	drawGrid(theGame.map);
}
function initialise(){
	theGame.restart();
	drawGrid(theGame.map);
}
function reloop(){
	window.requestAnimationFrame(gameLoop);
}	
function userClick(event){
	
	if(runningConway){
		var rect = display.getBoundingClientRect();
		var mousePositionX = event.clientX - rect.left;
		var mousePositionY = event.clientY - rect.top;
		var cellToGiveLife = getCellFromMousePosition(mousePositionX, mousePositionY);
		theGame.giveLife(cellToGiveLife[0],cellToGiveLife[1]);
		drawGrid(theGame.map);
	}
	
}
function clear(){
	theGame.clear();
}
function getCellFromMousePosition(mousePositionX, mousePositionY){
	var position = [Math.floor(mousePositionX/cellSize),Math.floor(mousePositionY/cellSize)];
	return position;
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mzRequestAnimationFrame;


function atat(event){
	evt = event;
	console.log(evt);
}
display.addEventListener('mousedown', function(event){
	
	userClick(event);
	userClicking = true;
 	
}, true);
display.addEventListener('mouseup', function(event){
	
	userClicking = false;
}, false);
display.addEventListener('mousemove', function(event){
	
	if(userClicking==true){

		userClick(event);
	}
},true);



var width, height;
var running, precision, cellSize, userClicking;
var theGame;
var ctx;
function initConway(w, h, context){

	ctx = context;
	width = w;
	height = h;
	running = true;
	precision = 60;
	theGame = new Conway(precision);
	cellSize = width/precision;
	userClicking = false;
	document.getElementById("theButton").onclick = test;
	document.getElementById("restart").onclick = initialise;
	document.getElementById("step").onclick = step;
	document.getElementById("clear").onclick = clear;
	window.requestAnimationFrame(gameLoop);
}

