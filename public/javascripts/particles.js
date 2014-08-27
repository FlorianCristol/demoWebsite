function ParticlesPlanets(w,h,context,bounds,numberOfParticles,particlesPerFrame){
	this.ctx = context;
	this.width = w;
	this.height = h;
	this.particleSources = [new particleSource(new Vector(this.width/2, this.height/2), Vector.fromAngle(0, this.width/500))];
	this.particleSize = this.height/150;
	this.particlesPerFrame = particlesPerFrame;
    this.numberOfParticles = numberOfParticles;
	this.particleArray = [];
	this.planets = [];

	this.particlesRunning = true;


}

ParticlesPlanets.systemLoop = function(){
	this.clearBackground();
	this.updateSystem();
	this.drawParticles();


};
ParticlesPlanets.updateSystem = function(){
	this.createParticles();
	this.updateParticles();

};

ParticlesPlanets.createParticles = function(){
	if(this.particleArray.length > this.numberOfParticles) return;

	for(var j = 0; j < this.particleSources.length; j++){ 
		for(var i = 0; i < this.particlesPerFrame; i++){
		  particleArray.push(this.particleSources[j].createParticle());
		}
	}

};
ParticlesPlanets.drawParticles = function(){
	console.log("WTF");
	this.ctx.fillStyle = "rgb(0,0,255)";
	for(var i = 0, numOfParticles = this.particleArray.length; i < numOfParticles; i++){
		var position = this.particleArray[i].position;  
		this.ctx.fillRect(position.x, position.y, particleSize, particleSize);
	}
	this.particleSources.forEach(drawPlanet);
	this.planets.forEach(drawPlanet);
};
ParticlesPlanets.clearBackground = function(){
	this.ctx.fillStyle = "rgb(0,0,0)";
	this.ctx.fillRect(0,0,this.width,this.height);
};
ParticlesPlanets.updateParticles = function(){
	var newParticleArray = [];
	for(var i = 0, numOfParticles=this.particleArray.length; i < numOfParticles; i++){
		if(this.particleArray[i].position.x < 0 ||
			this.particleArray[i].position.x > width ||
			this.particleArray[i].position.y < 0 ||
			this.particleArray[i].position.y > height) continue;
		this.particleArray[i].planetForce(planets);
		this.particleArray[i].move();
		newParticleArray.push(particleArray[i]);
	}
	this.particleArray = newParticleArray;
}
/*
 Vector class and its tools
*/

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
	this.speed = speed || new Vector(0,0);
}
particleSource.prototype.createParticle = function(){
	var length = this.speed.getLength();

	var angle = this.speed.getAngle() + Math.random()*6.5;
	var position = new Vector(this.position.x, this.position.y);
	var speed = Vector.fromAngle(angle, length);
	
	return new Particle(position, speed);

};
ParticlesPlanets.drawPlanet = function(object){
	this.ctx.fillStyle = "rgb(0,255,0)";
	this.ctx.beginPath();
	this.ctx.arc(object.position.x, object.position.y, 5, 0, 2*Math.PI);
	this.ctx.closePath();
	this.ctx.fill();
};

function Planet(position, mass){
	this.position = position || new Vector(0,0);
	this.mass = mass || 200;

}
Planet.prototype.setMass = function(mass){
	this.mass = mass || 200;
};

ParticlesPlanets.userClick = function(event){
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
};

