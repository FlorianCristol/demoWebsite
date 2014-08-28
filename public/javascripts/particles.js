
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




