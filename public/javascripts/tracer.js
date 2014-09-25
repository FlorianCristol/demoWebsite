/*
 * Author Florian Cristol
 * Inspired by permadi.com/tutorial/raycast
 */
function Tracer(w, h, ctx) {

	this.ctx = ctx;

	this.width = w;
	this.height = h;
	this.keyPressed = "undefined";
	this.unitsPerGrid = 64;
	this.fov = 60;
	this.p = RaycasterPlayer(832, 80, 210);

	this.initKeys();

	this.keys = [];
	this.angleSpeed = 2;

	this.map = new TRACER.Map();

	//regarding the ray casting per say
	this.gfx = new GfxEngine(this.unitsPerGrid,320,200,this.width,this.height,this.fov);
	this.movementManager = new MovementManager(this.unitsPerGrid);
	/*What I have to do:
	Substract half the pov from the direction;
	Trace until wall is hit;
	Record distance to the wall;
	Add angle and cast new ray;
	*/

}

Tracer.prototype.initKeys = function() {
	
}
Tracer.prototype.userClick = function(e){

}

Tracer.prototype.movePlayer = function(player,map) {
	var player = player;
	this.movementManager.moveEntity(player,map);

}
Tracer.prototype.draw = function(horizontalInter, verticalInter) {
	this.gfx.draw(this.ctx,this.p,this.map);
}
Tracer.prototype.systemLoop = function() {

		this.movePlayer(this.p,this.map);
		this.draw();
		this.numberOfRuns++;



}
Tracer.prototype.toRadians = function(angle) {
	return angle * Math.PI / 180.0;
}