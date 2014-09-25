function MovementManager(unitsPerGrid) {
	this.unitsPerGrid = unitsPerGrid;
	this.initialise();

}
MovementManager.prototype.initialise = function() {
	this.keys = {
		LEFT: false,
		RIGHT: false,
		TOP: false,
		DOWN: false,
		TLEFT: false,
		TRIGHT: false
	};

	this.index =   ['LEFT', 'RIGHT', 'TOP', 'DOWN', 'TLEFT', 'TRIGHT'];
	var that = this;
	$(document).keydown(function(e) {
		var key = e.which;
		if (key == "81") that.keys['LEFT'] = true;
		if (key == "38") that.keys['UP'] = true;
		if (key == "37") that.keys['TLEFT'] = true;
		if (key == "39") that.keys['TRIGHT'] = true;
		if (key == "40") that.keys['DOWN'] = true;
		if (key == "68") that.keys['RIGHT'] = true;

	});
	$(document).keyup(function(e) {
		var key = e.which;
		if (key == "81") that.keys['LEFT'] = false;
		if (key == "38") that.keys['UP'] = false;
		if (key == "37") that.keys['TLEFT'] = false;
		if (key == "39") that.keys['TRIGHT'] = false;
		if (key == "40") that.keys['DOWN'] = false;
		if (key == "68") that.keys['RIGHT'] = false;
	});
}
MovementManager.prototype.moveEntity = function(p, map) {
	var player = p;
	if (this.keys['LEFT'] === true) {
		player.moveLeft();
	}
	if (this.keys['RIGHT'] === true) {
		player.moveRight();
	}
	if (this.keys['UP'] === true) {
		player.moveForward();
	}
	if (this.keys['DOWN'] === true) {
		player.moveBackward();
	}
	if (this.keys['TLEFT'] === true) {
		player.angleUp();
	}
	if (this.keys['TRIGHT'] === true) {
		player.angleDown();
	}
	var newPosition = p.getNewPosition();
	var oldPosition = p.getPosition();
	var newXGrid = Math.floor(newPosition.x / this.unitsPerGrid);
	var newYGrid = Math.floor(newPosition.y / this.unitsPerGrid);
	var oldXGrid = Math.floor(oldPosition.x / this.unitsPerGrid);
	var oldYGrid = Math.floor(oldPosition.y / this.unitsPerGrid);
	if (map.getCell(newXGrid, newYGrid) === 0) {
		player.confirmMovement();
	} else if (map.getCell(newXGrid, oldYGrid) === '0') {
		player.confirmXMovement();

	} else if (map.getCell(oldXGrid, newYGrid) === '0') {
		player.confirmYMovement();
	}


}