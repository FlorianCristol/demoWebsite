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

$(window).load(function() {

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame  || window.mzRequestAnimationFrame;

	var _display = [];
	_display.width = window.innerWidth;
	_display.height = window.innerHeight;
	//console.log("display window.inner:"+_display.width+" : "+_display.height);

	var c = document.getElementById('display');

	/* !IMPORTANT
	 *	If I don't create the renderer before calling a three.js instance, it doesnt work...
	 * The canvas gets reloaded as we go through the different applets, but ducktyping is cool
	 */
	renderer = new THREE.WebGLRenderer({
		canvas: c
	});
	/* GET THIS BACK
	 *
	 */

	var _container = document.getElementById('display');
	var _context = _container.getContext('2d');
	var _bounds = _container.getBoundingClientRect();
	//console.log("Container CLient rect:"+ _bounds);

	//initConway(_display.width, _display.height, _context);
	fitToContainer(_container);
	var _display = [];
	_display.width = _container.offsetWidth;
	_display.height = _container.offsetHeight;

	function fitToContainer(display) {
		display.style.width = '100%';
		display.style.height = '99%';

		display.width = display.offsetWidth;
		display.height = display.offsetHeight;
		console.log("OFFSETWIDTH" + display.width + " offsetHEIGHT" + display.offsetHeight);
	};


	/*
	 *
	 *	UNTIL HERE GET IT BACK
	 */


	//var teub = new TEST.Atest(2);
	//console.log(teub.systemLoop());
	//please = new pcles.ParticlesPlanets(_display.width, _display.height,_context,_bounds,1500,9);
	//please = new ThreesCube(_display.width, _display.height,document.getElementById("display"),35000);
	IdontUnderstand = createInnit();
	reInitialiseCanvas(true);
	please = createCube(_display.width, _display.height, renderer, 35000);
	theGame = 'undefined';
	console.log("cube width" + _display.width + "cube height" + _display.height);
	//please = createInnit();
	//theTestGame = new GameOfLife(_display.width, _display.height,_context,200, _bounds);
	//theTestGame = new GameOfLife(500, 500, _context,200,_bounds);
	//	console.log("OffsetWidth"+_container.offsetWidth+" offsetHeight"+_container.offsetHeight);
	//theTestGame = new GameOfLife(_container.offsetWidth, _container.offsetHeight, _context, 100, _bounds);
	//theTestParticles.systemLoop();	theTestGame.gameLoop();
	please.systemLoop();

	window.requestAnimationFrame(go);
	var userClicking = false;
	//initParticles(_display.width, _display.height,_context);
	function go() {
		if (please !== 'undefined') {
			please.systemLoop();
		}
		//console.log("SystemLoop");
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

	/*
	 *	TAKE THIS BACK
	 */
	reinitialiseEvents();

	function reinitialiseEvents() {
		_container.addEventListener('mousedown', function(event) {
			if (please !== 'undefined') {
				please.userClick(event);
			}
			userClicking = true;

		}, true);

		_container.addEventListener('mouseup', function(event) {

			userClicking = false;
		}, false);

		_container.addEventListener('mousemove', function(event) {

			if (userClicking == true && please instanceof GameOfLife) {

				please.userClick(event);

			}
		}, true);
	}

	/*
	 * TILL HERE
	 */
	//$("button").click(button1Clicked());
	document.getElementById("button1").onclick = button1Clicked;
	document.getElementById("button2").onclick = button2Clicked;
	document.getElementById("button3").onclick = button3Clicked;
	document.getElementById("button4").onclick = button4Clicked;
	document.getElementById("particleLaunch").onclick = particleLaunchClicked
	document.getElementById("conwayLaunch").onclick = conwayLaunchClicked;
	document.getElementById("attractionLaunch").onclick = attractionLaunchClicked;
	document.getElementById("squareAlgLaunch").onclick = squareAlgLaunchClicked;
	document.getElementById("snakeLaunch").onclick = snakeLaunchClicked;
	document.getElementById("rayLaunch").onclick = rayLaunchClicked;
	/*
	 *First app to be loaded is Particles, and it doesn't support buttons.
	 */
	$(".topButton").removeClass("btnOn");
	$(".topButton").addClass("disabled btnOff");
	function rayLaunchClicked (){
		$(".active").removeClass("active");
		$(".rayLaunch").parent().addClass('active');
		$(".topButton").removeClass("btnOn ");
		$(".topButton").addClass("disabled btnOff");

		reInitialiseCanvas(false);
		leaveSnake();
		please = new Tracer(_display.width, _display.height, _context);
		reinitialiseEvents();
		console.log("create Ray caster");
	}
	function particleLaunchClicked() {
		reInitialiseCanvas(true);
		$(".active").removeClass("active");
		$(".particleLaunch").parent().addClass('active');
		//renderer = new THREE.WebGLRenderer({canvas: _container});
		$(".topButton").removeClass("btnOn");
		$(".topButton").addClass("disabled btnOff");
		leaveSnake();
		please = new createCube(_display.width, _display.height, renderer, 35000);
		reinitialiseEvents();
		console.log("create cube");
	}

	function conwayLaunchClicked() {
		$(".active").removeClass("active");
		$(".conwayLaunch").parent().addClass('active');
		$(".topButton").removeClass("disabled btnOff");
		$(".topButton").addClass("btnOn");

		reInitialiseCanvas(false);
		leaveSnake();
		please = new GameOfLife(_display.width, _display.height, _context, 200, _bounds);
		reinitialiseEvents();
	}

	function attractionLaunchClicked() {
		$(".active").removeClass("active");
		$(".attractionLaunch").parent().addClass('active');
		$(".topButton").removeClass("disabled btnOff");
		$(".topButton").addClass("btnOn");

		reInitialiseCanvas(false);
		leaveSnake();
		please = new pcles.ParticlesPlanets(_display.width, _display.height, _context, _bounds, 1500, 9);
		reinitialiseEvents();
		console.log("create attraction");
	}

	function squareAlgLaunchClicked() {
		$(".active").removeClass("active");
		$(".squareAlgLaunch").parent().addClass('active');
		console.log("PARENT :" + $(".particleLaunch").parent());
		$(".topButton").removeClass("btnOn ");
		$(".topButton").addClass("disabled btnOff");

		reInitialiseCanvas(false);
		leaveSnake();
		please = new TerrainGen(_display.width, _display.height, _context, _bounds, 128);
		reinitialiseEvents();
		console.log("create Terrain");
	}

	function snakeLaunchClicked() {
		$(".active").removeClass("active");
		$(".snakeLaunch").parent().addClass('active');
		console.log("PARENT :" + $(".snakeLaunch").parent());
		$(".topButton").removeClass("btnOn ");
		$(".topButton").addClass("disabled btnOff");
		please = "undefined";
		reInitialiseCanvas(false);
		delete theGame;
		theGame = new SNAKE.Client(_display.width, _display.height, _context, 60);
		theGame.refreshSockets();
		reinitialiseEvents();
		console.log("new game");

	}

	function leaveSnake() {
		if (theGame !== "undefined") {
			theGame.leaveGame();
			theGame = "undefined";
		}

	}

	function reInitialiseCanvas(webGL) {
		$("canvas").remove();
		if (!webGL) {
			$("#testest").append("<canvas class='drawingCanvas' id='display'></canvas>")
			_container = document.getElementById('display');
			_context = _container.getContext('2d');
			fitToContainer(_container);
		}
		if (webGL) {
			//renderer = new THREE.WebGLRenderer({canvas: _container});
		}

	}

	function button1Clicked() {
		please.switchRunning();
		console.log("?SUPA");
	};

	function button2Clicked() {
		please.initialise();
		console.log("INITIALISED");
	};

	function button3Clicked() {
		please.stepIt();
		console.log("STEPPING");
	};

	function button4Clicked() {
		please.clear();
		console.log("CLEARED");
	}
	/*
	 *	END OF JQUERY READY
	 */
});