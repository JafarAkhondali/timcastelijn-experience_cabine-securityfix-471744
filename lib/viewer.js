
// import './dragger'
import 'three.js'
import 'three.js/examples/js/controls/OrbitControls';
import 'three.js/examples/js/libs/stats.min.js';

import CabineGrid from './cabine_grid.js'


export function viewer(){

  console.log("viewer")


  var container, stats;
  var camera, controls, scene, renderer;
  var objects = [], plane;

  var document_edited = false;
  var length, width, height, grid;

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(),
  offset = new THREE.Vector3(),
  INTERSECTED, SELECTED;

  init();
  animate();

  function init() {
    container = document.createElement( 'div' );
    container.setAttribute( 'id', "renderer" );
    container.setAttribute( 'ondrop', "drop(event)" );
    container.setAttribute( 'ondragover', "allowDrop(event)" );
    // container.setAttribute( 'position', "absolute" );
    // container.setAttribute( 'top', "0px" );
    // container.setAttribute( 'left', "0px" );
    container.setAttribute( 'z-index', "-1" );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.05, 100 );
    camera.position.z = 10;

    // controls = new THREE.TrackballControls( camera );
    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.3;



    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0x505050 ) );

    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 500, 2000 );
    light.castShadow = true;

    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;

    light.shadowBias = -0.00022;

    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    scene.add( light );


    //create grid
    grid = new CabineGrid();
    scene.add(grid);
    //
    // // create dragger instance
    // dragger = new Dragger();

    //create objects
    var geometry = new THREE.BoxGeometry( 40, 40, 40 );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
    // scene.add( object );
    // objects.push( object );

    //create intersection plane
    plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
      new THREE.MeshBasicMaterial( { visible: true, wireframe: true } )
    );
    // rotate plane to xz orientation
    plane.rotation.x = Math.PI * -0.5;
    scene.add( plane );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.25;
    //camera.up.set( 0, 0, 1 );

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> webgl - draggable cubes';
    container.appendChild( info );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.right = '0px';
    container.appendChild( stats.domElement );

    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

    // window.addEventListener("beforeunload", function (e) {
    //     if (document_edited) {
    // 			var confirmationMessage = 'It looks like you have been editing something. '
    // 															+ 'If you leave before saving, your changes will be lost.';
    //
    // 			(e || window.event).returnValue = confirmationMessage; //Gecko + IE
    // 			return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    //     }
    //
    // });
    //

    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'keydown', onDocumentKeyDown, false );
  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );


  }

  function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // dragger.mouseMove()

  }

  function onDocumentMouseDown( event ) {

    event.preventDefault();

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( objects );

    if ( INTERSECTED ) {

      controls.enabled = false;

      SELECTED = INTERSECTED;
      // dragger.dragged = INTERSECTED;
      SELECTED.select();
      console.log(SELECTED.parent);

      var intersects = raycaster.intersectObject( plane );

      if ( intersects.length > 0 ) {

        offset.copy( intersects[ 0 ].point ).sub( plane.position );

      }

      container.style.cursor = 'move';

    }

  }

  function onDocumentMouseUp( event ) {

    event.preventDefault();

    // dragger.mouseUp()

  }

  function onDocumentKeyDown( event ) {
    switch( event.keyCode ) {

      case 8: event.preventDefault(); console.log("Delete"); break;

    }

  }

  //

  function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

  }

  function render() {

    controls.update();

    renderer.render( scene, camera );

  }
  //
  // // function allowDrop(ev) {
  // //     ev.preventDefault();
  // // }
  // //
  // // function drag(ev) {
  // //     ev.dataTransfer.setData("text", ev.target.id);
  // // }
  // //
  // // function drop(ev) {
  // //     ev.preventDefault();
  // //     var data = ev.dataTransfer.getData("text");
  // //     console.log("dropped ${data}");
  // //     console.log(ev.clientX, ev.clientY)
  // // }
  // function toggleChevron(e) {
  //     $(e.target)
  //         .prev('.panel-heading')
  //         .find("i.indicator")
  //         .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
  // }
  // $('#accordion').on('hidden.bs.collapse', toggleChevron);
  // $('#accordion').on('shown.bs.collapse', toggleChevron);
  //
  // function addBox(event){
  //
  //   //create objects
  //   var geometry = new THREE.BoxGeometry( 0.40, 0.40, 0.40 );
  //   var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
  //
  //   plane.lookAt( camera.position );
  //
  //   event.preventDefault();
  //
  //   raycaster.setFromCamera( mouse, camera );
  //
  //   var intersects = raycaster.intersectObject( plane );
  //
  //   if ( intersects.length > 0 ) {
  //     object.position = intersects[0].point
  //     console.log( intersects[0].point);
  //
  //
  //   }
  //
  //
  //   scene.add( object );
  //   // objects.push( object );
  //
  //   INTERSECTED = object
  //   SELECTED = object
  //   dragger.dragged = object;
  //
  // }
  // $('#drag1').mousedown( addBox);

}
