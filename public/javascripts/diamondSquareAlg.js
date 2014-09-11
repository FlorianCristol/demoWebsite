function TerrainGen(w,h,context,bounds,size){
//This algorithm requires sides to be power of 2 +1
//Source: http://www.gameprogrammer.com/fractal.html#diamond
this.size = Math.pow(size,2);

	this.width = w;
	this.height = h;
	this.ctx = context;
 this.roughness = 150;
 this.maxX = size;
 this.maxY = size;
 this.maxSide = size;
  this.cellSize = this.height / this.maxSide;
   this.map = new TERRAIN.Map(this.maxX+1,this.maxY+1);
   this.firstIteration = true;
 this.initialise();
 this.drawGrid();

 
}

TerrainGen.prototype.initialise = function(){
	var self = this;

	this.map.setCell(0, this.maxY,50); //this.maxY = 4 // 4*5 === celln° 20
	this.map.setCell(0, 0, 250);
	this.map.setCell(this.maxX, 0, 30);
	this.map.setCell(this.maxX, this.maxY,0);
	this.updateGrid();
	
		
}


TerrainGen.prototype.updateGrid = function(){
	var self = this;

	//if(self.firstIteration){
	divide(self.maxSide);
	//self.firstIteration = !self.firstIteration;

	/*}else{
		updateExperiment();
	}*/
	//divide(self.maxSide);

	function divide(size){
		var center = size/2;

		if(center < 1){
			
			return;
		}
		for(var i = 0; i < self.maxSide; i+= size){
			
			for(var j = 0; j < self.maxSide; j+= size){

				square(i+center,j+center,center,random(size));
				
			}
		}
		for(var i = 0; i < self.maxSide; i += size){
			for(var j = 0; j < self.maxSide ; j+=size){
				
				diamond(i+center,j,center,random(size));
				diamond(i,j+center,center,random(size));
				diamond(i+size,j+center,center,random(size));
				diamond(i+center,j+size,center,random(size));

			}
		}


		divide(center);
	}
	function updateExperiment(){
		

		var newArray = new Map(self.maxX, self.maxY);

		for(var x = 0 ; x <  self.maxSide; x++){
			for(var y = 0 ; y < self.maxSide; y ++){
				/*newArray.setCell(x,y-1,
					average([
						self.map.getCell(x-1,y-1),
						self.map.getCell(x,y-1),
						self.map.getCell(x+1,y-1),
						self.map.getCell(x-1,y),
						self.map.getCell(x+1,y),
						self.map.getCell(x-1,y+1),
						self.map.getCell(x,y+1),
						self.map.getCell(x+1,y+1),
						]));*/
					var colorValue = self.map.getCell(x,y)+4*self.map.getUp(x,y);
					if(colorValue >500 || colorValue < 0){
						self.map.setUp(x,y);
					}
					newArray.setCell(x,y,colorValue);

			}
		}
		self.map = newArray;
	}
	function random(size){
		var range = size/self.maxSide * self.roughness;
		var rand = range/2 - Math.random() * range;
		return rand;
	}

	function square(x,y,size,rand){
		var value = average([
			self.map.getCell(x-size,y-size),
			self.map.getCell(x+size,y-size),
			self.map.getCell(x-size,y+size),
			self.map.getCell(x+size,y+size)]);

		self.map.setCell(x,y,value+rand);
		
	}
	function diamond(x,y,size,rand){
		var value = average([
			self.map.getCell(x-size,y),
			self.map.getCell(x,y+size),
			self.map.getCell(x+size,y),
			self.map.getCell(x,y-size)]);
		self.map.setCell(x,y,value+rand);
	}
	function average(array){
		var sum = 0;
		for(var x = 0; x < array.length; x++){
			sum += array[x];
		}
			return sum/array.length;
	}	
}
TerrainGen.prototype.hue = function(h){
	 	var r = Math.abs(h * 6 - 3) - 1;
    var g = 2 - Math.abs(h * 6 - 2);
    var b = 2 - Math.abs(h * 6 - 4);
    return [Math.floor(r * 255),Math.floor(g * 255),Math.floor(b * 255)];
}

TerrainGen.prototype.HSVtoRGB = function(h,s,v){

    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };

}
TerrainGen.prototype.drawGrid = function(){
	var self = this;
	this.clearBackground(this.ctx);
	this.ctx.fillStyle = 'rgb(0,0,0)';
	console.log("WIDTH HEIGHT INSIDE"+self.width+" "+self.height);

	for(var i =1, maxI = this.maxX; i < maxI-1; i++){
		for(var j = 1 , maxJ = this.maxY;j < maxJ-1;j++){

			
				if(this.map.getCell(i,j)>0){
					this.ctx.fillStyle = 'rgb('+parseInt(80+Math.abs(this.map.getCell(i,j)/2))+',0,0)';
					//console.log(this.map.getCell(i,j)+" inferior to 250"+'rgb('+parseInt(Math.abs(this.map.getCell(i,j)))+',0,0)');
					
				}else{
					this.ctx.fillStyle = 'rgb('+parseInt(80+Math.abs(this.map.getCell(i,j)/2))+',0,0)';
				//this.ctx.fillStyle = 'rgb(0,0,'+(parseInt(Math.abs(250+this.map.getCell(i,j))))+')';
				//console.log(this.map.getCell(i,j)+" Superior to 250 "+'rgb(0,0,'+(parseInt(Math.abs(250-this.map.getCell(i,j))))+')');
			

				}
				/*
				//var RGBColors = this.hue(this.map.getCell(i,j)/100);
				var RGBColors = this.HSVtoRGB(this.map.getCell(i,j)/100,1,1);
				console.log("RGB:"+RGBColors);
				this.ctx.fillStyle = 'rgb('+RGBColors.r+','+RGBColors.g+','+RGBColors.b+')';*/
				var p1 = project(i,j,this.map.getCell(i,j));
				var p2 = project(i+1,j,this.map.getCell(i+1,j));
				var p3 = project(i+1,j+1,this.map.getCell(i+1,j+1));
				var p4 = project(i,j+1,this.map.getCell(i,j+1));
				//this.ctx.fillRect(i*this.cellSize,j*this.cellSize,this.cellSize,this.cellSize);
				this.ctx.beginPath();
				this.ctx.moveTo(p1.x,p1.y);
				this.ctx.lineTo(p2.x,p2.y);
				this.ctx.lineTo(p3.x,p3.y);
				this.ctx.lineTo(p4.x,p4.y);
				this.ctx.closePath();
				this.ctx.fill();
				//console.log(p1.x+" "+p1.y+" "+p2.x+" "+p2.y+" "+p3.x+" "+p3.y+" "+p4.x+" "+p4.y);
		}
		/*this.ctx.fillStyle = 'rgb(0,255,0)';
		var p1 = project(0,0,0);
		console.log("P1X P1Y"+p1.x+" "+p1.y);
		this.ctx.fillRect(p1.x,p1.y,10,10);*/
	}

	function iso(x,y){
		return {
			x: 2.2 * (self.cellSize +x-y),
			y: 0.7 * (x + y)
		};
	}

	function project(x, y, z){
		var point = iso(x, y);
		var x0 = self.width * 0.5;
		var y0 = self.height * 0.4;
		var z = self.cellSize - z*0.5 + point.y * 0.75;
		var x = (point.x - self.cellSize * 0.5) * 1.2;
		var y = (self.cellSize - point.y) * 0.0001 +0.8 ;

		return {
			x: x0 + x / y,
			y: y0 + z /y
		};
	}
	



}
TerrainGen.prototype.clearBackground = function(ctx){
	this.ctx.fillStyle = 'rgb(0,0,0)';
	this.ctx.fillRect(0,0,this.width,this.height);
}
TerrainGen.prototype.userClick = function(event){

}
TerrainGen.prototype.switchRunning = function(){

}
TerrainGen.prototype.stepIt = function(){

}
TerrainGen.prototype.clear = function(){

}
TerrainGen.prototype.systemLoop = function(){
	//this.updateGrid();
	//this.drawGrid();

}


