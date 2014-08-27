/*var TEST = { REVISION: '3'};

TEST.Atest = function(c){
	this.a = 1;
	this.b = 2;
	this.c = c;
	this.running = true;
	this.map = new Map(1,2);

};
TEST.Atest.prototype.add = function(){
	
	this.c = this.c + this.a + this.b;
}
TEST.Atest.prototype.doSomething = function(){
	this.add();
	console.log("This.c = 6 ? :"+this.c);
	console.log(this.running);
}
TEST.Atest.prototype.drawOnStuff = function(theContext,w,h){
	theContext.fillStyle = 'rgb(0,0,255)';
	theContext.fillRect(0,0,w,h);
}

  //your code herevar display = document.getElementById('display');

  
  	var display = [];
	display.width = 0.83*window.innerWidth;
	display.height = 0.92*window.innerHeight;
	var container = document.getElementById('display');
	var bounds = container.getBoundingClientRect();
	var context = container.getContext('2d');
	

	var precision = 60;
	

	theTestGame = new GameOfLife(display.width, display.height,context,precision, bounds);

	


	window.requestAnimationFrame(loop);



	//console.log(theGame);
	function loop(){
		if(theTestGame.running()){
		theTestGame.update();
		theTestGame.drawGrid();
		}


		window.requestAnimationFrame(loop);
	}
	*/
	var _display = [];
	//_display.width = 0.83*window.innerWidth;
	//_display.height = 0.92*window.innerHeight;

	_display.width = window.innerWidth;
	_display.height = window.innerHeight;
	console.log("display window.inner:"+_display.width+" : "+_display.height);
	var _container = document.getElementById('display');
	var _bounds = _container.getBoundingClientRect();
	console.log("Container CLient rect:"+ _bounds);
	var _context = _container.getContext('2d');
	//initConway(_display.width, _display.height, _context);
	fitToContainer(_container);

	function fitToContainer(display){
		display.style.width = '100%';
		display.style.height= '92%';

		display.width = display.offsetWidth;
		display.height = display.offsetHeight;
	}
	//theTestGame = new GameOfLife(_display.width, _display.height,_context,200, _bounds);
	theTestGame = new GameOfLife(500, 500, _context,200,_bounds);
	window.requestAnimationFrame(go);
	function go(){
		theTestGame.gameLoop();
		window.requestAnimationFrame(go);
	}
	


	//window.requestAnimationFrame(theTestGame.gameLoop);
	//g2 = new GameOfLife2(_context,_display.width, _display.height);
	//g2.drawShit();
	//_context.fillStyle = 'rgb(0,255,0)';
	//_context.fillRect(0,0,_display.width, _display.height);