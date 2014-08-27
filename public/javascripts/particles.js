function systemLoop(){

	clearBackground();
	updateSystem();
	drawParticles();
	reloop();

}
function updateSystem(){

	createParticles();
	updateParticles();

}

function createParticles(){
	if(particleArray.length > numberOfParticles) return;

	for(var j = 0; j < particleSources.length; j++){ 
		for(var i = 0; i < particlesPerFrame; i++){
		  particleArray.push(particleSources[j].createParticle());
		}
	}

}
function drawParticles(){
	console.log("WTF");
	ctx.fillStyle = "rgb(0,0,255)";
	for(var i = 0, numOfParticles = particleArray.length; i < numOfParticles; i++){
		var position = particleArray[i].position;  
		ctx.fillRect(position.x, position.y, particleSize, particleSize);
	}
	particleSources.forEach(drawPlanet);
	planets.forEach(drawPlanet);
}
function clearBackground(){
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,width,height);
}
function reloop(){
	window.requestAnimationFrame(systemLoop);
}	
function updateParticles(){
	var newParticleArray = [];
	for(var i = 0, numOfParticles=particleArray.length; i < numOfParticles; i++){
		if(particleArray[i].position.x < 0 ||
			particleArray[i].position.x > width ||
			particleArray[i].position.y < 0 ||
			particleArray[i].position.y > height) continue;
		particleArray[i].planetForce(planets);
		particleArray[i].move();
		newParticleArray.push(particleArray[i]);
	}
	particleArray = newParticleArray;
}
/*
 Vector class and its tools
*/
function Vector(x, y){
	this.x = x || 0;
	this.y = y || 0;
}
//Pythagore theorem to get vector length
Vector.prototype.getLength = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
//Arctan2 to get the angle
Vector.prototype.getAngle = function(){
	return Math.atan2(this.x, this.y);
};
//It will be usefull to calculate a speed from an angle and length
Vector.fromAngle = function(angle, speed)
{
	return new Vector(speed * Math.cos(angle), speed * Math.sin(angle));
};
Vector.prototype.add = function(vector){
	this.x += vector.x;
	this.y += vector.y;
};
function Particle(point, speed, acceleration){
	this.position = point || new Vector(0,0);
	this.speed = speed || new Vector(0,0);
	this.acceleration = acceleration || new Vector(0,0);

}
Particle.prototype.move = function(){
	//At each frame a particle's speed gets the particle's acceleration
	//And to the position is added the speed

	this.speed.add(this.acceleration);
	this.position.add(this.speed);

};
Particle.prototype.planetForce = function(planets) {
	var accelX = 0;
	var accelY = 0;

	for(var i = 0, numPlanets = planets.length; i < numPlanets; i++){
		var planet = planets[i];

		var distX = planet.position.x - this.position.x;
		var distY = planet.position.y - this.position.y;

		var force = planet.mass / Math.pow(distX*distX+distY*distY, 1.5);

		accelX += distX * force;
		accelY += distY * force;
	}
	this.acceleration = new Vector(accelX, accelY);
};

//We want to be able to create particles from a certain point
function particleSource(position, speed){
	this.position = position || new Vector(0,0);
	this.speed = speed || new vector(0,0);
}
particleSource.prototype.createParticle = function(){
	var length = this.speed.getLength();

	var angle = this.speed.getAngle() + Math.random()*6.5;
	var position = new Vector(this.position.x, this.position.y);
	var speed = Vector.fromAngle(angle, length);
	
	return new Particle(position, speed);

}
function drawPlanet(object){
	ctx.fillStyle = "rgb(0,255,0)";
	ctx.beginPath();
	ctx.arc(object.position.x, object.position.y, 5, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function Planet(position, mass){
	this.position = position || new Vector(0,0);
	this.mass = mass || 200;

}
Planet.prototype.setMass = function(mass){
	this.mass = mass || 200;
};

function userClick(event){
	if(particlesRunning){
		var rect = display.getBoundingClientRect();

		console.log(display.getBoundingClientRect());
		var mousePosition = new Vector(event.pageX - rect.left, event.pageY - rect.top);
		//var mousePosition = new Vector(event.clientX - display.offsetLeft, event.clientY - display.offsetTop);
		//var mousePosition = new Vector(event.clientX, event.clientY);
		//console.log("Rect left:"+ rect.left);
		//console.log("Offset left:"+ display.offsetLeft);
		console.log(event.clientX+" "+event.clientY);
		planets.push(new Planet(mousePosition, -200));
	}
}
var ctx, width, height, particleSize, particlesPerFrame,numberOfParticles;
var particleArray = [];
var particleSources = [];
var planets = [];
var particlesRunning = false;
function initParticles(w,h,context){

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mzRequestAnimationFrame;
	ctx = context;
	particleSources = [new particleSource(new Vector(width/2, height/2), Vector.fromAngle(0, width/500))];
	particleSize = height/150;
	particlesPerFrame = 6;
    numberOfParticles = 6;
	particleArray = [];
	planets = [];
	width = w;
	height = h;
	particlesRunning = true;
	window.requestAnimationFrame(systemLoop);


}

display.addEventListener('click', function(event){
	userClick(event);
}, false);





