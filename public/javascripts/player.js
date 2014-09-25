
var RaycasterPlayer = function(posX,posY,direction){

	var position = {
		x: posX,
		y: posY
	};
	var newPosition = {
		x: posX,
		y: posY
	};
	var direction = direction;
	var speed = 3;
	var angleSpeed = 4;
	function toRadians(angle){
		return angle * Math.PI / 180.0;
	}
	function toDegrees(angle){
		return angle * 180.0 / Math.PI;
	}

	return {
		
		'moveLeft': function(){
			if(direction <= 90){
				newPosition.x  = position.x -Math.cos(toRadians(90 - direction)) * speed;
				newPosition.y = position.y - Math.sin(toRadians(90 - direction)) * speed;
			}else if(direction <= 180){
				newPosition.x = position.x - Math.cos(toRadians(direction - 90)) * speed;
				newPosition.y = position.y + Math.sin(toRadians(direction - 90)) * speed;
			} else if(direction <= 270){
				newPosition.x = position.x + Math.sin(toRadians(direction - 180)) * speed;
				newPosition.y = position.y + Math.cos(toRadians(direction - 180)) * speed;
			} else if(direction <= 360){
				newPosition.x = position.x + Math.cos(toRadians(direction - 270)) * speed;
				newPosition.y = position.y - Math.sin(toRadians(direction - 270)) * speed;
			}
		},
		'moveRight': function(){
			if(direction <= 90){
				newPosition.x  = position.x + Math.sin(toRadians(direction)) * speed;
				newPosition.y = position.y + Math.cos(toRadians(direction)) * speed;
			}else if(direction <= 180){
				newPosition.x = position.x + Math.cos(toRadians(direction - 90)) * speed;
				newPosition.y = position.y - Math.sin(toRadians(direction - 90)) * speed;
			} else if(direction <= 270){
				newPosition.x = position.x - Math.cos(toRadians(270 - direction)) * speed;
				newPosition.y = position.y - Math.sin(toRadians(270 - direction)) * speed;
			} else if(direction <= 360){
				newPosition.x = position.x - Math.cos(toRadians(direction - 270)) * speed;
				newPosition.y = position.y + Math.sin(toRadians(direction - 270)) * speed;
			}
		},
		'moveForward': function(){
			if(direction <= 90){
				newPosition.x  = position.x + Math.cos(toRadians(direction)) * speed;
				newPosition.y = position.y - Math.sin(toRadians(direction)) * speed;
			}else if(direction <= 180){
				newPosition.x = position.x - Math.cos(toRadians(180 - direction)) * speed;
				newPosition.y = position.y - Math.sin(toRadians(180 - direction)) * speed;
			} else if(direction <= 270){
				newPosition.x = position.x - Math.sin(toRadians(270 - direction)) * speed;
				newPosition.y = position.y + Math.cos(toRadians(270 - direction)) * speed;
			} else if(direction <= 360){
				newPosition.x = position.x + Math.cos(toRadians(360 - direction)) * speed;
				newPosition.y = position.y + Math.sin(toRadians(360 - direction)) * speed;
			}
		},
		'moveBackward': function(){
			if(direction <= 90){
				newPosition.x  =(position.x - Math.cos(toRadians(direction)) * speed);
				newPosition.y = (position.y + Math.sin(toRadians(direction)) * speed);
			}else if(direction <= 180){
				newPosition.x = (position.x + Math.cos(toRadians(180 - direction)) * speed);
				newPosition.y = (position.y + Math.sin(toRadians(180 - direction)) * speed);
			} else if(direction <= 270){
				newPosition.x = (position.x + Math.sin(toRadians(270 - direction)) * speed);
				newPosition.y = (position.y - Math.cos(toRadians(270 - direction)) * speed);
			} else if(direction <= 360){
				newPosition.x = (position.x - Math.cos(toRadians(360 - direction)) * speed);
				newPosition.y = (position.y - Math.sin(toRadians(360 - direction)) * speed);
			}
		},
		'getPosition': function(){
			return position;
		},
		'getNewPosition': function(){
			return newPosition;
		},
		'confirmMovement': function(){
			position.x = newPosition.x;
			position.y = newPosition.y;
		},
		'confirmXMovement': function(){
			position.x = newPosition.x;
		},
		'confirmYMovement':function(){
			position.y = newPosition.y;
		},
		'setSpeed': function(s){
			speed = s;
		},
		'angleUp':function(){
			direction = direction+angleSpeed;
			if(direction >= 360){
				direction = direction - 360;
			}
		},
		'angleDown':function(){
			direction = direction - angleSpeed;
			if(direction < 0){
				direction = 360+direction;
			}
		},
		'getDirection': function(){
			return direction;
		},


	};
}