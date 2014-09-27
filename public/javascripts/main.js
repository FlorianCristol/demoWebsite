/*
 *	Main JS page for the website
 * Grew from wild testing and need refactoring BADLY
 */
$(window).load(function() {

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame  || window.mzRequestAnimationFrame;

	var _display = [];
	_display.width = window.innerWidth;
	_display.height = window.innerHeight;

	var c = document.getElementById('display');


	//Next two functions where used to understand what was going on with three.js
	/*
	function Innit() {
		var c = document.getElementById('display');
		this.renderer = new THREE.WebGLRenderer({
			canvas: c
		});
	}

	function createInnit() {
		return new Innit();
	}
*/
	var _container = document.getElementById('display');
	var _context = _container.getContext('2d');
	var _bounds = _container.getBoundingClientRect();
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
	reInitialiseCanvas(true);

	/* !IMPORTANT
	 *	If I don't create the renderer before calling a three.js instance, it doesnt work...
	 * The canvas gets reloaded as we go through the different applets, but ducktyping is cool
	 */

	 var webgl = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();

	if (webgl) {
		Detector.webgl? console.log("yes") : console.log("no");
		renderer = new THREE.WebGLRenderer({
			canvas: c
		});

		please = createCube(_display.width, _display.height, renderer, 35000);
		please.systemLoop();
		return;
	} else {
		please = "undefined";
	}
	theGame = 'undefined';


	window.requestAnimationFrame(go);
	var userClicking = false;

	function go() {
		if (please !== 'undefined') {
			please.systemLoop();
		}
		//console.log("SystemLoop");
		window.requestAnimationFrame(go);
	};

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

	function rayLaunchClicked() {
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
				if(webgl){
		please = new createCube(_display.width, _display.height, renderer, 35000);
	}
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