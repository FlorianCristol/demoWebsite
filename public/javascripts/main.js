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
	var webgl = (function() {
		try {
			var canvas = document.getElementById('display');
			return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch (e) {
			return false;
		}
	})();
	if (webgl) {
		renderer = new THREE.WebGLRenderer({
			canvas: c
		});
	}

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

	if (webgl) {
		please = createCube(_display.width, _display.height, renderer, 35000);
	} else {
		please = "undefined";
	}
	var theGame = "undefined";


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
	tracer = false;

	function rayLaunchClicked() {
		$(".active").removeClass("active");
		$(".rayLaunch").parent().addClass('active');
		$(".topButton").removeClass("btnOn ");
		$(".topButton").addClass("disabled btnOff");

		reInitialiseCanvas(false);
		leaveSnake();
		if (!tracer) {
			$.getScript("/javascripts/gfxEngine.js", function(response, success) {
				if (success === "success") {
					$.getScript("/javascripts/tracer.js", function(response, success) {
						if (success === "success") {
							$.getScript("/javascripts/tracerMap.js", function(response, success) {
								if (success === "success") {
									$.getScript("/javascripts/player.js", function(response, success) {
										if (success === "success") {
											$.getScript("/javascripts/movementManager.js", function(response, success) {
												if (success === "success") {
													tracer = true;
													please = new Tracer(_display.width, _display.height, _context);
												}
											})
										}
									});
								}
							});
						}
					});
				}
			});
		} else {
			please = new Tracer(_display.width, _display.height, _context);
		}
		//please = new Tracer(_display.width, _display.height, _context);
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
		if (webgl) {
			please = new createCube(_display.width, _display.height, renderer, 35000);
		}
		reinitialiseEvents();
		console.log("create cube");
	}
	var cw = false;

	function conwayLaunchClicked() {
		$(".active").removeClass("active");
		$(".conwayLaunch").parent().addClass('active');
		$(".topButton").removeClass("disabled btnOff");
		$(".topButton").addClass("btnOn");

		reInitialiseCanvas(false);
		leaveSnake();
		if (!cw) {
			$.getScript("/javascripts/map.js", function(response, success) {
				if (success === "success") {
					$.getScript("/javascripts/gameOfLife.js", function(response, success) {
						if (success === "success") {
							cw = true;
							please = new GameOfLife(_display.width, _display.height, _context, 200, _bounds);
						}
					});
				}
			});
		} else {
			please = new GameOfLife(_display.width, _display.height, _context, 200, _bounds);
		}


		reinitialiseEvents();
	}
	var att = false;

	function attractionLaunchClicked() {
		$(".active").removeClass("active");
		$(".attractionLaunch").parent().addClass('active');
		$(".topButton").removeClass("disabled btnOff");
		$(".topButton").addClass("btnOn");

		reInitialiseCanvas(false);
		leaveSnake();

		if (!att) {
			$.getScript("/javascripts/Vector.js", function(response, success) {
				if (success === "success") {
					$.getScript("/javascripts/planet.js", function(response, success) {
						if (success === "success") {
							$.getScript("/javascripts/particles.js", function(response, success) {
								if (success === "success") {
									$.getScript("/javascripts/particlesPlanets.js", function(response, success) {
										if (success === "success") {
											att = true;
											please = new pcles.ParticlesPlanets(_display.width, _display.height, _context, _bounds, 15000, 9);
										}
									});
								}
							});
						}
					});
				}
			});
		} else {
			please = new pcles.ParticlesPlanets(_display.width, _display.height, _context, _bounds, 1500, 9);
		}

		reinitialiseEvents();
		console.log("create attraction");
	}
	var sq = false;

	function squareAlgLaunchClicked() {
		$(".active").removeClass("active");
		$(".squareAlgLaunch").parent().addClass('active');
		console.log("PARENT :" + $(".particleLaunch").parent());
		$(".topButton").removeClass("btnOn ");
		$(".topButton").addClass("disabled btnOff");

		reInitialiseCanvas(false);
		leaveSnake();
		if (!sq) {
			$.getScript("/javascripts/Tmap.js", function(response, success) {
				if (success === "success") {
					$.getScript("/javascripts/diamondSquareAlg.js", function(response, success) {
						if (success === "success") {
							sq = true;
							please = new TerrainGen(_display.width, _display.height, _context, _bounds, 128);
						}
					});
				}
			});
		} else {
			please = new TerrainGen(_display.width, _display.height, _context, _bounds, 128);
		}
		//please = new TerrainGen(_display.width, _display.height, _context, _bounds, 128);
		reinitialiseEvents();
		console.log("create Terrain");
	}
	var sk = false;

	function snakeLaunchClicked() {
		$(".active").removeClass("active");
		$(".snakeLaunch").parent().addClass('active');
		console.log("PARENT :" + $(".snakeLaunch").parent());
		$(".topButton").removeClass("btnOn ");
		$(".topButton").addClass("disabled btnOff");

		reInitialiseCanvas(false);

		//theGame = new SNAKE.Client(_display.width, _display.height, _context, 60);

		if (!sk) {
			$.getScript("/javascripts/snakeMap.js", function(response, success) {
				if (success === "success") {
					$.getScript("/javascripts/snakeClient2.js", function(response, success) {
						if (success === "success") {

							sk = true;
							please = "undefined";
							delete theGame;
							theGame = new SNAKE.Client(_display.width, _display.height, _context, 60);
							theGame.refreshSockets();
						}

					});
				}
			});
		} else {
			please = "undefined";
			delete theGame;
			theGame = new SNAKE.Client(_display.width, _display.height, _context, 60);
			theGame.refreshSockets();
		}
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