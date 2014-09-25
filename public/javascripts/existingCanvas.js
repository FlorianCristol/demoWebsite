/*
*   Created to test out the creation of a renderer for three.js
* three.js contrary to specification HAS to be handed an initialised renderer.
*/


    function Innit() {
        var c = document.getElementById('display');
        this.renderer = new THREE.WebGLRenderer({canvas: c});
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
