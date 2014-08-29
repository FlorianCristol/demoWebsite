


    function Innit() {

       /* this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 1000;

        this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
*/
        var c = document.getElementById('display');
        this.renderer = new THREE.WebGLRenderer({canvas: c});
        /*this.renderer.setSize(c.offsetWidth, c.offsetHeight);
        console.log("OK");*/

        //document.body.appendChild( renderer.domElement );

    }
    
    Innit.prototype.wtf = function(){
        console.log("OK");
    };

    Innit.prototype.animateLOL = function(){
        

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;

        this.renderer.render( this.scene, this.camera );
        

    };
    function createInnit(){
        return new Innit();
    }
    //IdontUnderstand = new Innit();
    //IdontUndestand = createInnit();
        //connard = createInnit();

       /* requestAnimationFrame( bordel );
        function bordel (){
            connard.animateLOL();
            requestAnimationFrame(bordel);
        }
        //supatest = new Innit();*/