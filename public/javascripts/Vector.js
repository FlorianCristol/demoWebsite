/*
*	@Author Florian Cristol
* Simple Vector class
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