var pcles = {REVISION: '2'};

pcles.ParticlesPlanets = function(w,h,context,bounds,numberOfParticles,particlesPerFrame){
	this.ctx = context;
	console.log(this.ctx);
	this.width = w;
	this.height = h;
	this.bounds = bounds;
	this.initialise();
	this.particleSize = this.height/150;
	this.particlesPerFrame = particlesPerFrame;
    this.numberOfParticles = numberOfParticles;
	
	this.particlesRunning = true;
	this.step = false;

}

pcles.ParticlesPlanets.prototype.initialise = function(){
	this.particleSources = [new particleSource(new Vector(this.width/2, this.height/2), Vector.fromAngle(0, this.width/500))];
	this.particleArray = [];
	this.planets = [];
	this.clearBackground();
}	
pcles.ParticlesPlanets.prototype.clear = function(){
	this.particleSources = [];
	this.particleArray = [];
	this.planets = [];
	this.clearBackground();
}
pcles.ParticlesPlanets.prototype.stepIt = function() {
	this.step = true;
};

pcles.ParticlesPlanets.prototype.systemLoop = function(){
if(this.particlesRunning || this.step){
	this.clearBackground();
	this.updateSystem();
	this.drawParticles();
	this.step = false;
}

};
pcles.ParticlesPlanets.prototype.updateSystem = function(){
	this.createParticles();
	this.updateParticles();

};

pcles.ParticlesPlanets.prototype.userClick = function(event){

		var rect = this.bounds;

		console.log(rect);
		var mousePosition = new Vector(event.pageX - rect.left, event.pageY - rect.top);
		//var mousePosition = new Vector(event.clientX - display.offsetLeft, event.clientY - display.offsetTop);
		//var mousePosition = new Vector(event.clientX, event.clientY);
		//console.log("Rect left:"+ rect.left);
		//console.log("Offset left:"+ display.offsetLeft);
		console.log(event.clientX+" "+event.clientY);

		this.planets.push(new Planet(mousePosition, -200));
		this.drawParticles();
};

pcles.ParticlesPlanets.prototype.drawPlanet = function(object){
	this.ctx.fillStyle = "rgb(0,255,0)";
	this.ctx.beginPath();
	this.ctx.arc(object.position.x, object.position.y, 5, 0, 2*Math.PI);
	this.ctx.closePath();
	this.ctx.fill();
};


pcles.ParticlesPlanets.prototype.createParticles = function(){
	if(this.particleArray.length > this.numberOfParticles) return;

	for(var j = 0; j < this.particleSources.length; j++){ 
		for(var i = 0; i < this.particlesPerFrame; i++){
		  this.particleArray.push(this.particleSources[j].createParticle());
		}
	}

};
pcles.ParticlesPlanets.prototype.drawParticles = function(){

	this.ctx.fillStyle = "rgb(0,0,255)";

	for(var i = 0, numOfParticles = this.particleArray.length; i < numOfParticles; i++){
		var position = this.particleArray[i].position;  
		this.ctx.fillRect(position.x, position.y, this.particleSize, this.particleSize);
	}
	var thatCTX = this.ctx;
	for(var i = 0, numSources = this.particleSources.length; i < numSources; i++){
		this.drawPlanet(this.particleSources[i]);
	}
	for(var i = 0, numPlanets = this.planets.length; i < numPlanets; i++){
		this.drawPlanet(this.planets[i]);
	}
	//this.particleSources.forEach(this.drawPlanet(thatCTX));
	//this.planets.forEach(this.drawPlanet(thatCTX));
};

pcles.ParticlesPlanets.prototype.clearBackground = function(){
	this.ctx.fillStyle = "rgb(0,0,0)";
	this.ctx.fillRect(0,0,this.width,this.height);
};

pcles.ParticlesPlanets.prototype.updateParticles = function(){
	var newParticleArray = [];
	for(var i = 0, numOfParticles=this.particleArray.length; i < numOfParticles; i++){
		if(this.particleArray[i].position.x < 0 ||
			this.particleArray[i].position.x > this.width ||
			this.particleArray[i].position.y < 0 ||
			this.particleArray[i].position.y > this.height) continue;
		this.particleArray[i].planetForce(this.planets);
		this.particleArray[i].move();
		newParticleArray.push(this.particleArray[i]);
	}
	this.particleArray = newParticleArray;
};
pcles.ParticlesPlanets.prototype.switchRunning = function() {
	this.particlesRunning = !this.particlesRunning;
};
