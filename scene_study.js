// js for three.js scene study. created by morry
var main = function(){
  // create scene object
  var scene = new THREE.Scene();

  // set camera on scene
  var width  = 640; // default scene width
  var height = 480; // default scene height
  var fov    = 60;  // default scene field of viewv
  var aspect = width / height;
  var near   = 1;
  var far    = 1000;
  var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0,0,50);

  // set webGL renderer on DOM element
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // setLight
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0,0.7,0.7);
  scene.add(directionalLight);
  // set mesh wuth geometory
  var geometry = new THREE.CubeGeometry(30,30,30);
  var material = new THREE.MeshPhongMaterial({color:0xff0000});
  var mesh     = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer.render(scene, camera);

  (function renderLoop(){
    requestAnimationFrame(renderLoop);
    mesh.rotation.set(
      0,
      mesh.rotation.y + 0.01,
      mesh.rotation.z + 0.01
    )
    renderer.render(scene, camera);
  })();
};

window.addEventListener("DOMContentLoaded", main, false);
