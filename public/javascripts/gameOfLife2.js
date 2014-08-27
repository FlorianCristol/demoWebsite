function GameOfLife2(context,w,h){
	
	this.runningBool = true;
	this.context = context;
	this.w = w;
	this.h = h;
	//console.log(this.boundingClientRect);
	//size+1 et max-1 nous permet d'avoir une bordure de cells
	//Qui n'entrent pas dans les calculs d'une génération à l'autre
	//Ce qui évite de checker à chaque fois si on est au bord pour 
	


	
	//requestAnimationFrame(this.gameLoop);
}
GameOfLife2.prototype.drawShit = function(){
	this.context.fillStyle = 'rgb(0,0,255)';
	this.context.fillRect(0,0,1000,1000);
};