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
TEST.super = function(b){
	return b;
}
TEST.Atest.prototype.systemLoop = function(){
	return 3;
}
function blabla(){
	console.log(TEST.super(2));
}

blabla();*/
  //your code herevar display = document.getElementById('display');

  /*
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

	/*----------------------------------------
	*	GOOD --------------------------
	*/

	$( document ).ready(function() {

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mzRequestAnimationFrame;

	var _display = [];
	_display.width = window.innerWidth;
	_display.height = window.innerHeight;
	//console.log("display window.inner:"+_display.width+" : "+_display.height);
	var _container = document.getElementById('display');
	var _bounds = _container.getBoundingClientRect();
	//console.log("Container CLient rect:"+ _bounds);
	var _context = _container.getContext('2d');
	//initConway(_display.width, _display.height, _context);
	fitToContainer(_container);
	function fitToContainer(display){
		display.style.width = '100%';
		display.style.height= '99%';

		display.width = display.offsetWidth;
		display.height = display.offsetHeight;
	};
	//var teub = new TEST.Atest(2);
	//console.log(teub.systemLoop());
	please = new pcles.ParticlesPlanets(_display.width, _display.height,_context,_bounds,1500,9);

	//theTestGame = new GameOfLife(_display.width, _display.height,_context,200, _bounds);
	//theTestGame = new GameOfLife(500, 500, _context,200,_bounds);
	//	console.log("OffsetWidth"+_container.offsetWidth+" offsetHeight"+_container.offsetHeight);
	//theTestGame = new GameOfLife(_container.offsetWidth, _container.offsetHeight, _context, 100, _bounds);
	//theTestParticles.systemLoop();	theTestGame.gameLoop();
	please.systemLoop();

	window.requestAnimationFrame(go);
	var userClicking = false;
	//initParticles(_display.width, _display.height,_context);
	function go(){

		please.systemLoop();

		window.requestAnimationFrame(go);
	};
	/*_container.addEventListener('click', function(event){
		please.userClick(event);
		console.log("CLICKED YO");
	}, false);
	_container.addEventListener('mousemove', function(event){
		//console.log('FIRED EVENT');
	}, false);
*/
	_container.addEventListener('mousedown', function(event){
	
	please.userClick(event);
	userClicking = true;
 	
	}, true);
	_container.addEventListener('mouseup', function(event){
		
		userClicking = false;
	}, false);
	_container.addEventListener('mousemove', function(event){
		
		if(userClicking==true && please instanceof GameOfLife){

			please.userClick(event);
		}
	},true);
	//$("button").click(button1Clicked());
	document.getElementById("button1").onclick = button1Clicked;
	document.getElementById("button2").onclick = button2Clicked;
	document.getElementById("button3").onclick = button3Clicked;
	document.getElementById("button4").onclick = button4Clicked;
	document.getElementById("particleLaunch").onclick = particleLaunchClicked;
	document.getElementById("conwayLaunch").onclick = conwayLaunchClicked;
	document.getElementById("attractionLaunch").onclick = particleLaunchClicked;

	function particleLaunchClicked(){
		please = new pcles.ParticlesPlanets(_display.width, _display.height,_context,_bounds,1500,9);
	}
	function conwayLaunchClicked(){
		please = new GameOfLife(_display.width, _display.height,_context,200, _bounds);
	}
	function button1Clicked(){
		please.switchRunning();
		console.log("?SUPA");
	};
	function button2Clicked(){
		please.initialise();
		console.log("INITIALISED");
	};
	function button3Clicked(){
		please.stepIt();
		console.log("STEPPING");
	};
	function button4Clicked(){
		please.clear();
		console.log("CLEARED");
	}
	/*
	*	END OF JQUERY READY
	*/
	} );