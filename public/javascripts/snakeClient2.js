if (typeof SNAKE === 'undefined') {
	SNAKE = {
		REVISION: 1
	};
}
/*
 *	START OF PLAYER PROTO
 * The player proto represents one snake.
 */
SNAKE.Player = function(x, y, size, direction) {
	this.snakeArray = [];
	this.initialX = x;
	this.initialY = y;
	this.direction = direction;
	this.growing = 0;
	this.initialise();
}

SNAKE.Player.prototype.initialise = function() {
	if (this.direction === "LEFT") {
		for (var i = 0; i < 5; i++) {
			//Push adds at the end of the array
			this.snakeArray.push({
				x: this.initialX + i,
				y: this.initialY
			});
		}
	} else if (this.direction === "RIGHT") {
		for (var i = 0; i < 5; i++) {
			//Push adds at the end of the array
			this.snakeArray.push({
				x: this.initialX - i,
				y: this.initialY
			});
		}
	}
};

SNAKE.Player.prototype.setDirection = function(direction) {
	if ((direction === "UP" && this.direction !== "DOWN")  ||
		(direction === "DOWN" && this.direction !== "UP") ||
		(direction === "LEFT" && this.direction !== "RIGHT") ||
		(direction === "RIGHT" && this.direction !== "LEFT")) {
		this.direction = direction;
	} else {
		//console.log("Invalid direction :"+direction);
	}
};

SNAKE.Player.prototype.move = function() {
	var headX = this.snakeArray[0].x;
	var headY = this.snakeArray[0].y;
	if (this.direction === "RIGHT") {
		++headX;
	} else if (this.direction === "LEFT") {
		--headX;
	} else if (this.direction === "UP") {
		--headY;
	} else if (this.direction === "DOWN") {
		++headY;
	}
	var newHead = {
		x: headX,
		y: headY
	};
	//Add new head to the array
	this.snakeArray.unshift(newHead);
	//pop the last cell of the snake
	//if it isn't growing
	if (this.growing === 0) {
		this.snakeArray.pop();
	} else {
		//this.growing = this.growing ;
	}
};

SNAKE.Player.prototype.grow = function(growth) {
	this.growing = growth;
};
SNAKE.Player.prototype.getGrowth = function() {
	return this.growing;
}
SNAKE.Player.prototype.getHead = function() {
	return this.snakeArray[0];
};
SNAKE.Player.prototype.getTail = function() {
	return this.snakeArray[this.snakeArray.length - 1];
}
SNAKE.Player.prototype.getSnakeArray = function() {
	return this.snakeArray;
}
SNAKE.Player.prototype.setHead = function(position) {
	this.snakeArray[0].x = position.x;
	this.snakeArray[0].y = position.y;

}
/*
 *	END OF PLAYER PROTO
 */
/*
 *	START OF CLIENT PROTO
 */
SNAKE.Client = function(w, h, ctx, gridSide) {
	this.keyPressed;
	this.width = w,
	this.height = h;
	this.cellSize = Math.floor(h / gridSide);
	this.topLeft = (this.width - this.height) / 2;
	this.ctx = ctx;
	this.gridSide = gridSide;
	this.players = [];
	this.playerBook = [];
	this.running = false;
	this.waiting = true;
	this.initialPosition = [{
		x: 10,
		y: 0
	}, {
		x: this.gridSide - 10,
		y: 0
	}, {
		x: 10,
		y: this.gridSide
	}, {
		x: this.gridSide - 10,
		y: this.gridSide
	}];
	this.initialDirections = ["RIGHT", "LEFT", "RIGHT", "LEFT"];
	this.growth = 2;
	this.socket = io.connect();
	this.newFood = false;
	this.map = new SNAKE.Map(gridSide, gridSide);
	this.win;
	this.initKeyPressed();
	this.setSockets();
	this.backgroundClear();
	this.draw();
}

SNAKE.Client.prototype.addPlayer = function(player, initialPos) {

	this.players.push(new SNAKE.Player(this.initialPosition[initialPos].x, this.initialPosition[initialPos].y, 5, this.initialDirections[initialPos]));
	this.playerBook[player] = this.players[this.players.length - 1];


};

SNAKE.Client.prototype.setPlayerMovement = function(player, movement) {
	this.playerBook[player].setDirection(movement);
};

SNAKE.Client.prototype.movePlayers = function() {
	for (var i = 0, max = this.players.length; i < max; i++) {
		this.players[i].move();

	}
};
SNAKE.Client.prototype.setPlayerGrowth = function(player, growth) {
	this.playerBook[player].grow(growth);
};
SNAKE.Client.prototype.draw = function() {
	//this.backgroundClear();

	/*

	var savePlayers = [];
	savePlayers.push(this.players[0].getSnakeArray());
	savePlayers.push(this.players[1].getSnakeArray());

	for(var i = 0 ; i < savePlayers.length ; i++){
		for(var j = 0 ; j < savePlayers[i].length; j++){
			this.ctx.fillRect(savePlayers[i][j].x*this.cellSize,savePlayers[i][j].y*this.cellSize,this.cellSize,this.cellSize);

		}
	}
	var food = this.map.getFood();

	for(var i = 0, max = food.length; i < max ; i++){
		this.ctx.fillRect(food[i].x*this.cellSize,food[i].y*this.cellSize,this.cellSize,this.cellSize);
	}
*/
	if (this.running) {
		this.drawRunning();
		//console.log("SNAKE LENGTH: " + this.players[0].getSnakeArray().length);
	} else if (this.waiting) {
		this.ctx.fillStyle = 'rgb(255,0,0)';
		var mid = this.height / 2;
		var textHeight = this.height / 8;
		var topLeft = mid - textHeight / 2;
		this.ctx.font = textHeight + "px Verdana";
		this.ctx.fillText("Waiting for player", 0, topLeft);
	} else if (this.win) {
		this.drawWin();
	} else {
		this.drawLost();
	}

};
SNAKE.Client.prototype.drawRunning = function() {
	

	var savePlayers = [];

	for (var i = 0, max = this.players.length; i < max; i++) {
		this.ctx.fillStyle = 'rgb(255,0,0)';
		savePlayers.push({
			head: this.players[i].getHead(),
			tail: this.players[i].getTail(),
			growth: this.players[i].getGrowth()
		});
		this.ctx.fillRect(this.topLeft + savePlayers[i].head.x * this.cellSize, savePlayers[i].head.y * this.cellSize, this.cellSize, this.cellSize);
		if (savePlayers[i].growth === 0) {

			this.ctx.fillStyle = 'rgb(0,0,0)';
			this.ctx.fillRect(this.topLeft + savePlayers[i].tail.x * this.cellSize, savePlayers[i].tail.y * this.cellSize, this.cellSize, this.cellSize);
		}
	}
	var food = this.map.getFood();
	if (this.newFood === true) {
		this.ctx.fillStyle = 'rgb(255,0,0)';
		for (var i = 0, max = food.length; i < max; i++) {
			this.ctx.fillRect(this.topLeft + food[i].x * this.cellSize, food[i].y * this.cellSize, this.cellSize, this.cellSize);
			//console.log(food[i].x + " " + food[i].y);
		}
		this.newFood = false;
	}
	/*
	this.backgroundClear();
	this.ctx.fillStyle = 'rgb(0,255,0)';
	for (var i = 0; i < this.players.length; i++) {
		var p1 = this.players[i].getSnakeArray();
		for (var j = 0; j < p1.length; j++) {

			this.ctx.fillRect(this.topLeft + p1[j].x * this.cellSize, p1[j].y * this.cellSize, this.cellSize, this.cellSize)
		}
	}
	var food = this.map.getFood();
	for (var i = 0, max = food.length; i < max; i++) {
		this.ctx.fillRect(this.topLeft + food[i].x * this.cellSize, food[i].y * this.cellSize, this.cellSize, this.cellSize);
		//console.log(food[i].x + " " + food[i].y);
	}
	*/

}
SNAKE.Client.prototype.drawWin = function() {
	this.ctx.fillStyle = 'rgb(255,0,0)';
	var mid = this.height / 2;
	var textHeight = this.height / 8;
	var topLeft = mid - textHeight / 2;
	this.ctx.font = textHeight + "px Verdana";
	this.ctx.fillText("YOU WON !", 0, topLeft);
}
SNAKE.Client.prototype.drawLost = function() {
	this.ctx.fillStyle = 'rgb(255,0,0)';
	var mid = this.height / 2;
	var textHeight = this.height / 8;
	var topLeft = mid - textHeight / 2;
	this.ctx.font = textHeight + "px Verdana";
	this.ctx.fillText("YOU LOST !", 0, topLeft);
}
SNAKE.Client.prototype.backgroundClear = function() {
	this.ctx.fillStyle = 'rgb(0,0,0)';
	this.ctx.fillRect(0, 0, this.width, this.height);


}
SNAKE.Client.prototype.initKeyPressed = function() {
	var that = this;

	$(document).keydown(function(e) {
		var key = e.which;
		if (key == "37") that.keyPressed = "LEFT";
		else if (key == "38") that.keyPressed = "UP";
		else if (key == "39") that.keyPressed = "RIGHT";
		else if (key == "40") that.keyPressed = "DOWN";

	});

};
SNAKE.Client.prototype.checkCollisions = function() {
	for (var i = 0, max = this.players.length; i < max; i++) {

		var head = this.players[i].getHead();
		var position = {};
		if (head.x < 0) {
			position.x = 59;
			position.y = head.y;
			this.players[i].setHead(position);
		} else if (head.x > 59) {
			position.x = 0;
			position.y = head.y;
			this.players[i].setHead(position);
		} else if (head.y > 59) {
			position.x = head.x;
			position.y = 0;
			this.players[i].setHead(position);
		} else if (head.y < 0) {
			position.x = head.x;
			position.y = 59;
			this.players[i].setHead(position);
		}

	}
		
}
SNAKE.Client.prototype.refreshSockets = function() {
	this.socket.emit('reset', "reset");
	this.socket.emit('waiting', {
		playerName: "Fugger"
	});
	//console.log("REFRESHED SOCKETS LOL");
}
SNAKE.Client.prototype.leaveGame = function(){
	this.socket.emit('reset','reset');
}
SNAKE.Client.prototype.setSockets = function() {
	var that = this;
	this.socket.emit('waiting', {
		playerName: "Fugger"
	});

	this.socket.on('players', function(msg) {

		that.addPlayer(msg.player1, 0);
		that.addPlayer(msg.player2, 1);
		that.waiting = false;
		that.running = true;
		that.backgroundClear();
	});
	/*At every tick the server sends updated info about each snake's status and food
	 *It receives:
	 *p1,p2,p1Growth,p2Growth,p1Dir,p2Dir,food
	 *
	 */
	this.socket.on('update', function(msg) {

		that.setPlayerMovement(msg.p1, msg.p1Dir);
		that.setPlayerMovement(msg.p2, msg.p2Dir);
		that.setPlayerGrowth(msg.p1, msg.p1Growth);
		that.setPlayerGrowth(msg.p2, msg.p2Growth);
		
		that.movePlayers();
		that.checkCollisions();
		that.draw();
		that.socket.emit('key', that.keyPressed);


	});
	this.socket.on('food', function(msg) {
		that.map.setFood(msg);
		that.newFood = true;
	});
	this.socket.on('lost', function(msg) {
		console.log("lost" + msg);
		that.running = false;
		that.win = false;
	});
	this.socket.on('win', function(msg) {
		console.log("win" + msg);
		that.running = false;
		that.win = true;
	});
}