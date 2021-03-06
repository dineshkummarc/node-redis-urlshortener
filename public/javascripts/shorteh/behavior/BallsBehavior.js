dojo.provide('shorteh.behavior.BallsBehavior');
dojo.declare('shorteh.behavior.BallsBehavior', mojo.command.Behavior, {
  
  execute: function(requestObj) {
    
    
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var container, stats;
    var camera, scene, renderer, particles, geometry, material, i, h, color, colors = [], sprite, size, x, y, z;
    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {

      container = document.createElement( 'div' );
      container.className = 'ballslol'
      document.body.appendChild( container );

      camera = new THREE.Camera( 50, window.innerWidth / window.innerHeight, 1, 3000 );
      camera.position.z = 1400;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2( 0x000000, 0.0006 );

      geometry = new THREE.Geometry();

      sprite = THREE.ImageUtils.loadTexture( "/images/ball.png" );

      for ( i = 0; i < 5000; i++ ) {

        x = 2000 * Math.random() - 1000;
        y = 2000 * Math.random() - 1000;
        z = 2000 * Math.random() - 1000;
        vector = new THREE.Vector3( x, y, z );
        geometry.vertices.push( new THREE.Vertex( vector ) );

        colors[ i ] = new THREE.Color( 0xffffff );
        colors[ i ].setHSV( (x+1000)/2000, 1.0, 1.0 );

      }

      geometry.colors = colors;

      material = new THREE.ParticleBasicMaterial( { size: 85, map: sprite, vertexColors: true } );
      material.color.setHSV( 1.0, 0.2, 0.8 );

      particles = new THREE.ParticleSystem( geometry, material );
      particles.sortParticles = true;
      particles.updateMatrix();
      scene.addObject( particles );

/*
      var light = new THREE.DirectionalLight( 0xffffff );
      light.position.x = 0;
      light.position.y = 0;
      light.position.z = 1;
      scene.addLight( light );*/


      renderer = new THREE.WebGLRenderer( { clearAlpha: 1 } );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

/*
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      container.appendChild( stats.domElement );*/


      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      window.addEventListener( 'resize', onWindowResize, false );

    }

    function onDocumentMouseMove( event ) {

      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;

    }

    function onDocumentTouchStart( event ) {

      if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

      }
    }

    function onDocumentTouchMove( event ) {

      if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

      }

    }

    function onWindowResize( event ) {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

      requestAnimationFrame( animate );

      render();
      //stats.update();

    }

    function render() {

      var time = new Date().getTime() * 0.00005;

      camera.position.x += ( mouseX - camera.position.x ) * 0.05;
      camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

      h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
      material.color.setHSV( h, 0.8, 1.0 );

      renderer.render( scene, camera );

    }
  }
});

