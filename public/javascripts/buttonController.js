

  //your code herevar display = document.getElementById('display');
  	var display = [];
	display.width = 0.83*window.innerWidth;
	display.height = 0.92*window.innerHeight;
	var container = document.getElementById('display');
	var context = container.getContext('2d');
	//initConway(display.width, display.height);
	//initParticles(display.width, display.height);
	document.getElementById('conwayLaunch').onclick = test;
	function test(){
		initConway(display.width, display.height, context);
		console.log("clicked");
	}
