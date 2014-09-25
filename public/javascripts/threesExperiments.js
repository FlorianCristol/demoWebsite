/*
*	Simple and uninteresting cube made out of particles in three.js
* only on the site because it looks "impressive" to someone who doesn't know 
* programming
*/

function ThreesCube(w,h,renderer,numberOfParticles){
	this.width = w;
	this.height = h;
	this.step = false;
	this.camera = new THREE.PerspectiveCamera( 27, this.width/this.height, 5, 3500); //(FOV , Aspect ratio, near / far clipping)
	this.camera.position.z = 2750;
	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.Fog(0x050505, 2000, 3500);
	this.runningBool = true;
	this.particles = numberOfParticles;
	this.particlesPositions = new Float32Array(this.particles * 3);
	this.particlesColors = new Float32Array(this.particles * 3);
	this.color = new THREE.Color();
	this.buffer = new THREE.BufferGeometry();
	this.n = 1000;
	this.n2 = this.n / 2;
	this.material = new THREE.PointCloudMaterial( {
		size: 15,
		vertexColors: THREE.VertexColors
	});
	this.initialise();
	this.particleSystem = new THREE.PointCloud(this.buffer, this.material);
	this.scene.add(this.particleSystem);

	renderere = new THREE.WebGLRenderer();
    //renderere.setSize( window.innerWidth, window.innerHeight );
    renderere.setSize(w,h);
    //document.body.appendChild( renderere.domElement );
    $("#testest").append(renderere.domElement);
    console.log(renderere.domElement.offsetWidth);
	this.renderer = renderere;

	this.renderer.setClearColor(this.scene.fog.color, 1);


}

ThreesCube.prototype.initialise = function(){
	this.initiateTheCube();
};
ThreesCube.prototype.switchRunning = function(){
	this.runningBool = !this.runningBool;
};
ThreesCube.prototype.stepIt = function(){
	this.step = true;
};
ThreesCube.prototype.clear = function(){
	this.particlesPositions = [];
};
ThreesCube.prototype.systemLoop = function(){
	this.render();
}
ThreesCube.prototype.userclick = function(event){

};
ThreesCube.prototype.initiateTheCube = function(){
	for ( var i = 0; i < this.particlesPositions.length; i += 3 ) {

		// particlesPositions

		var x = Math.random() * this.n - this.n2;
		var y = Math.random() * this.n - this.n2;
		var z = Math.random() * this.n - this.n2;

		this.particlesPositions[ i ]     = x;
		this.particlesPositions[ i + 1 ] = y;
		this.particlesPositions[ i + 2 ] = z;

		// particlesColors

		var vx = ( x / this.n ) + 0.5;
		var vy = ( y / this.n ) + 0.5;
		var vz = ( z / this.n ) + 0.5;

		this.color.setRGB( vx, vy, vz );

		this.particlesColors[ i ]     = this.color.r;
		this.particlesColors[ i + 1 ] = this.color.g;
		this.particlesColors[ i + 2 ] = this.color.b;

	}
	this.buffer.addAttribute('position', new THREE.BufferAttribute(this.particlesPositions, 3));
	this.buffer.addAttribute('color', new THREE.BufferAttribute(this.particlesColors, 3));

	this.buffer.computeBoundingSphere();
}

ThreesCube.prototype.animate = function(){


	render();


}

ThreesCube.prototype.render = function(){
	
	var time = Date.now() * 0.001;

	this.particleSystem.rotation.x = time * 0.25;
	this.particleSystem.rotation.y = time * 0.5;

	this.renderer.render( this.scene, this.camera );
	

}

function createCube(w,h,ctx,numberOfParticles){
	return new ThreesCube(w,h,ctx,numberOfParticles);
}
