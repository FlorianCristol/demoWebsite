function Planet(position, mass){
	this.position = position || new Vector(0,0);
	this.mass = mass || 200;

}
Planet.prototype.setMass = function(mass){
	this.mass = mass || 200;
};