//var display = document.getElementById('display');

//document.body.appendChild(renderer.domElement);

var scene, camera, renderer;
var mesh;
init();
animate();
function init(){
	var display = [];
	//display.width = 0.791*screen.width;
	//display.height = 0.877*screen.height;
	display.width = 0.791*window.innerWidth;
	display.height = 0.99*window.innerHeight ;
	console.log(display.width+" "+display.height);

	camera = new THREE.PerspectiveCamera( 27, display.width/display.height, 5, 3500); //(FOV , Aspect ratio, near / far clipping)
	camera.position.z = 2750;
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x050505, 2000, 3500);
	
	var particles = 350000;
	var particlesPositions = new Float32Array(particles * 3);
	var particlesColors = new Float32Array(particles * 3);
	var color = new THREE.Color();
	var buffer = new THREE.BufferGeometry();
	var n = 1000, n2 = n / 2;
	for ( var i = 0; i < particlesPositions.length; i += 3 ) {

		// particlesPositions

		var x = Math.random() * n - n2;
		var y = Math.random() * n - n2;
		var z = Math.random() * n - n2;

		particlesPositions[ i ]     = x;
		particlesPositions[ i + 1 ] = y;
		particlesPositions[ i + 2 ] = z;

		// particlesColors

		var vx = ( x / n ) + 0.5;
		var vy = ( y / n ) + 0.5;
		var vz = ( z / n ) + 0.5;

		color.setRGB( vx, vy, vz );

		particlesColors[ i ]     = color.r;
		particlesColors[ i + 1 ] = color.g;
		particlesColors[ i + 2 ] = color.b;

	}

	buffer.addAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
	buffer.addAttribute('color', new THREE.BufferAttribute(particlesColors, 3));

	buffer.computeBoundingSphere();

	var material = new THREE.PointCloudMaterial( {
		size: 15,
		vertexColors: THREE.VertexColors
	});

	particleSystem = new THREE.PointCloud(buffer, material);
	scene.add(particleSystem);

	renderer = new THREE.WebGLRenderer({antialias: false});
	renderer.setClearColor(scene.fog.color, 1);
	renderer.setSize(display.width, display.height);
	document.getElementById('drawingPanel').appendChild(renderer.domElement);
 //créer :
 	//Tableau avec les particlesPositions
 	//Tableau avec les couleurs
 	//THREE.BufferGeometry: geometry.addAttribute('position', new THREE.BufferAttribute(particlesPositions, 3)
 		//geometry.addAttribute('color', new THREE.BufferAttribute(particlesColors, 3)))
	
}
function animate() {

	requestAnimationFrame( animate );

	render();


}

function render() {

	var time = Date.now() * 0.001;

	particleSystem.rotation.x = time * 0.25;
	particleSystem.rotation.y = time * 0.5;

	renderer.render( scene, camera );

}

