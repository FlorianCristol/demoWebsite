/*
 *	@author Florian Cristol
 *	Graphics engine for 2D map represented as array
 * Could use a builder class with chained functions;
 */
function GfxEngine(numberOfUnitsPerGrid, emulatedWidth, emulatedHeight, realWidth, realHeight, fov) {
	this.unitsPerGrid = numberOfUnitsPerGrid | 64;
	this.dimensionX = emulatedWidth;
	this.dimensionY = emulatedHeight;
	this.width = realWidth;
	this.height = realHeight;
	this.fov = fov;
	this.xPerRay = this.width / this.dimensionX;
	this.yPerRay = this.height / this.dimensionY;
	this.betweenRayAngle = this.fov / this.dimensionX;
	this.distToProjectionPlane = (this.dimensionX / 2) / Math.tan(this.toRadians(this.fov / 2));
	this.wallSize = 2 * this.unitsPerGrid;
	this.numberOfRuns = 0;
}

//toRadians for Math.trig functions
GfxEngine.prototype.toRadians = function(angle) {
	return angle * Math.PI / 180.0;
};

GfxEngine.prototype.verticalIntersection = function(player, map) {
	var player = player;
	var map = map;
	var playerPos = player.getPosition();
	var direction = this.addingFov(player.getDirection(), this.fov / 2);
	var maxDistance = 1024;
	var interSectionArrayVertical = [];

	for (var i = 0; i < this.dimensionX; i++) {
		var counter = 0;
		var wall = false;
		var firstIntersection = this.getFirstVerticalIntersection(direction, playerPos);
		var hop = this.verticalIntersectionHop(direction, firstIntersection);
		var distance = Math.abs(playerPos.x - firstIntersection.xUnit) / Math.cos(this.toRadians(direction));

		while (!wall && Math.abs(distance) < maxDistance) {
			if (map.getCell(firstIntersection.xGrid, firstIntersection.yGrid) === 1) {
				distance = Math.abs(playerPos.x - firstIntersection.xUnit) / Math.cos(this.toRadians(direction)) * Math.cos(this.toRadians(player.getDirection() - direction));
				interSectionArrayVertical[i] = distance;
				wall = true;
			} else {
				firstIntersection = this.getNextVerticalIntersection(firstIntersection, hop);
				distance = Math.abs(playerPos.x - firstIntersection.xUnit) / Math.cos(this.toRadians(direction));
			}
		}

		if (interSectionArrayVertical[i] === undefined) {
			interSectionArrayVertical[i] = 10000;
		}

		direction = this.substractFov(direction, this.betweenRayAngle);
		direction = this.noDivisionByZero(direction);
	}
	return interSectionArrayVertical;
};

GfxEngine.prototype.getNextVerticalIntersection = function(previousIntersection, hop) {
	var xGrid, yGrid, xUnit, yUnit;
	xUnit = previousIntersection.xUnit + hop.x;
	yUnit = previousIntersection.yUnit + hop.y
	xGrid = Math.floor(xUnit / this.unitsPerGrid);
	yGrid = Math.floor(yUnit / this.unitsPerGrid);
	return {
		xUnit: xUnit,
		yUnit: yUnit,
		xGrid: xGrid,
		yGrid: yGrid
	};

}
GfxEngine.prototype.verticalIntersectionHop = function(direction, firstIntersection) {
	var xNext, yNext;

	if (direction > 270 || direction < 90) {
		xNext = this.unitsPerGrid;
	} else {
		xNext = -this.unitsPerGrid;
	}

	yNext = -xNext * Math.tan(this.toRadians(direction));

	return {
		x: xNext,
		y: yNext
	};
}
GfxEngine.prototype.getFirstVerticalIntersection = function(direction, position) {
	var axu;

	if (direction > 270 || direction < 90) {
		axu = Math.floor(position.x / this.unitsPerGrid) * this.unitsPerGrid + this.unitsPerGrid;
	} else {
		axu = Math.floor(position.x / this.unitsPerGrid) * this.unitsPerGrid - 1;
	}

	var axg = Math.floor(axu / this.unitsPerGrid);
	var ayu = position.y + (position.x - axu) * Math.tan(this.toRadians(direction));
	var ayg = Math.floor(ayu / this.unitsPerGrid);

	return {
		xUnit: axu,
		yUnit: ayu,
		xGrid: axg,
		yGrid: ayg
	};
};

GfxEngine.prototype.horizontalIntersection = function(player, map) {
	var player = player;
	var map = map;
	var playerPos = player.getPosition();
	var direction = this.addingFov(player.getDirection(), this.fov / 2);
	var maxDistance = 1024;
	var interSectionArrayHorizontal = [];
	var counter = 0;

	//Get the first intersection horizontaly;
	for (var i = 0; i < 320; i++) {
		var wall = false;
		var firstIntersection = this.getFirstHorizontalIntersection(direction, playerPos);
		var hop = this.horizontalIntersectionHop(direction, firstIntersection);
		var distance = Math.abs((playerPos.x - firstIntersection.xUnit)) / Math.cos(this.toRadians(direction));

		while (!wall && Math.abs(distance) < maxDistance) {

			if (map.getCell(firstIntersection.xGrid, firstIntersection.yGrid) === 1) {
				intersection = true;
				distance = Math.abs((playerPos.x - firstIntersection.xUnit)) / Math.cos(this.toRadians(direction)) * Math.cos(this.toRadians(player.getDirection() - direction));
				interSectionArrayHorizontal[i] = distance;
				wall = true;
			} else {
				firstIntersection = this.getNextHorizontalIntersection(firstIntersection, hop);
				distance = Math.abs((playerPos.x - firstIntersection.xUnit)) / Math.cos(this.toRadians(direction));
			}
		}

		if (interSectionArrayHorizontal[i] === undefined) {
			interSectionArrayHorizontal[i] = 10000;
		}

		direction = this.substractFov(direction, this.betweenRayAngle);
		direction = this.noDivisionByZero(direction);
	}
	return interSectionArrayHorizontal;
};

GfxEngine.prototype.noDivisionByZero = function(direction) {
	if (direction === 90) {
		return 90.0001;
	} else if (direction === 270) {
		return 270.0001;
	} else {
		return direction;
	}
}
GfxEngine.prototype.addingFov = function(direction, addValue) {
	direction = direction + addValue;
	if (direction > 360) {
		direction = direction - 360;
	}
	return direction;

};
GfxEngine.prototype.substractFov = function(direction, subValue) {
	direction = direction - subValue;
	if (direction < 0) {
		direction = 360 + direction;
	}
	return direction;
};
GfxEngine.prototype.getFirstHorizontalIntersection = function(direction, position) {
	var ayu;
	if (direction >= 0 && direction <= 180) {
		ayu = Math.floor(position.y / this.unitsPerGrid) * this.unitsPerGrid - 1;
	} else {
		ayu = Math.floor(position.y / this.unitsPerGrid) * this.unitsPerGrid + this.unitsPerGrid;
	}

	var ayg = Math.floor(ayu / this.unitsPerGrid);
	// Get the unit value of interection with grid cell

	var axu = position.x + (position.y - ayu) / Math.tan(this.toRadians(direction));
	//Get grid value of interection
	axg = Math.floor(axu / this.unitsPerGrid);
	return {
		xUnit: axu,
		yUnit: ayu,
		xGrid: axg,
		yGrid: ayg
	};
}
//function to get the x and y value between two horizontal intersections;
GfxEngine.prototype.horizontalIntersectionHop = function(direction, firstIntersection) {
	var yNext;
	if (direction >= 0 && direction <= 180) {
		yNext = -64;
	} else {
		yNext = 64;
	}

	var xNext = -yNext / Math.tan(this.toRadians(direction));

	return {
		x: xNext,
		y: yNext
	};
};

//Go from one horizontal intersection to the next
GfxEngine.prototype.getNextHorizontalIntersection = function(previousIntersection, intersectionHop) {
	var xGrid, yGrid, xUnit, yUnit;
	xUnit = previousIntersection.xUnit + intersectionHop.x;
	yUnit = previousIntersection.yUnit + intersectionHop.y
	xGrid = Math.floor(xUnit / 64);
	yGrid = Math.floor(yUnit / 64);
	return {
		xUnit: xUnit,
		yUnit: yUnit,
		xGrid: xGrid,
		yGrid: yGrid
	};
};

GfxEngine.prototype.draw = function(ctx, player, map) {
	var ctx = ctx;
	var player = player;
	var map = map;

	var h = this.horizontalIntersection(player, map);
	var v = this.verticalIntersection(player, map);
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.fillStyle = 'rgb(0,255,0)';
	for (var i = 0; i < 320; i++) {
		if (Math.abs(h[i]) <= Math.abs(v[i])) {
			var projectedHeight = (this.wallSize / h[i]) * this.distToProjectionPlane;
		} else {
			var projectedHeight = (this.wallSize / v[i]) * this.distToProjectionPlane;
		}

		if ((h[i] !== 10000) || (v[i] !== 10000)) {
			ctx.fillStyle = 'rgb(0,255,0)';
			ctx.fillRect(i * this.xPerRay, this.height / 2 - Math.abs(projectedHeight / 2), this.xPerRay, Math.abs(projectedHeight));
			ctx.fillStyle = 'rgb(0,0,0)';
			ctx.fillRect(i * this.xPerRay, this.height / 2 + Math.abs(projectedHeight / 2), this.xPerRay + 1, (this.height - projectedHeight) / 2);

		}
	}
	var radarPosX = this.width - this.width / 5;
	ctx.fillStyle = 'rgb(0,0,0)';
	var cellWidth = (this.width - radarPosX) / map.getMaxX();
	var radarPosY = this.height - map.getMaxY() * cellWidth;
	for (var i = 0; i < map.getMaxX(); i++) {
		for (var j = 0; j < map.getMaxY(); j++) {
			if (map.getCell(i, j) === 1) {
				ctx.fillStyle = 'rgb(255,0,0)';
				ctx.fillRect(radarPosX + i * cellWidth, radarPosY + j * cellWidth, cellWidth, cellWidth);
			} else {
				ctx.fillStyle = 'rgb(0,0,0)';
				ctx.fillRect(radarPosX + i * cellWidth, radarPosY + j * cellWidth, cellWidth, cellWidth);
			}
		}
	}

	var pos = player.getPosition();
	var posX = pos.x / 64 * cellWidth;
	var posY = pos.y / 64 * cellWidth;
	var marqueur = this.getDirectionIndicator(player);
	var marqueurX = marqueur.x / 64 * cellWidth;
	var marqueurY = marqueur.y / 64 * cellWidth;
	ctx.fillStyle = 'rgb(0,255,0)';
	ctx.fillRect(radarPosX + posX - 2.5, radarPosY + posY - 2.5, 5, 5)
	ctx.strokeStyle = 'rgb(255,0,0)'
	ctx.beginPath();
	ctx.moveTo(radarPosX + posX, radarPosY + posY);
	ctx.lineTo(radarPosX + marqueurX, radarPosY + marqueurY);
	ctx.stroke();

};

GfxEngine.prototype.getDirectionIndicator = function(player) {
	var direction = player.getDirection();
	var position = player.getPosition();
	var posX = position.x;
	var posY = position.y;
	var indicatorLength = 50;

	if (direction <= 90) {
		posX = posX + Math.cos(this.toRadians(direction)) * indicatorLength;
		posY = posY - Math.sin(this.toRadians(direction)) * indicatorLength;
	} else if (direction <= 180) {
		posX = posX - Math.sin(this.toRadians(direction - 90)) * indicatorLength;
		posY = posY - Math.cos(this.toRadians(direction - 90)) * indicatorLength;
	} else if (direction <= 270) {
		posX = posX - Math.sin(this.toRadians(270 - direction)) * indicatorLength;
		posY = posY + Math.cos(this.toRadians(270 - direction)) * indicatorLength;
	} else if (direction <= 360) {
		posX = posX + Math.cos(this.toRadians(360 - direction)) * indicatorLength;
		posY = posY + Math.sin(this.toRadians(360 - direction)) * indicatorLength;
	}

	return {
		x: posX,
		y: posY
	};
};