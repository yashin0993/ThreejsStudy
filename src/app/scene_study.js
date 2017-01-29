
// -------- オプション初期化関数 ---------- //
var render_option = new Object();
function InitOption(){
  render_option["width"]  = $("#render_view").prop("clientWidth");
  render_option["height"] = $("#render_view").prop("clientHeight");
  render_option["fov"]    = 60;
  render_option["near"]   = 1;
  render_option["far"]    = 10000;
}

// -------- レンダラー初期化関数 ---------- //
var renderer;
function InitRenderer(){
  // レンダラーオブジェクトを生成(antialiasは有効にする(描画を滑らかにする))
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(render_option.width, render_option.height);
  renderer.setClearColor(0x444444, 1)
  // 生成したオブジェクトを描画するDOMに追加する
  document.getElementById("render_view")
          .appendChild(renderer.domElement);
}

// -------- カメラ初期化関数 ---------- //
var camera;
var controls;
function InitCamera(){
  var aspect = render_option.width / render_option.height;
  camera =  new THREE.PerspectiveCamera( 
              render_option.fov, 
              aspect, 
              render_option.near, 
              render_option.far 
            );

  camera.position.set(100, 100, 100);
  camera.up.set(0, 1, 0);
  camera.lookAt({x:0, y:0, z:0});
  controls = new THREE.OrbitControls(camera,renderer.domElement);
}

var grid_size = 160;  // 軸方向半分のサイズ
var cell_size = 16;   // 軸方向全セル数
function InitAxis(){
  // グリッドをセット
  var grid = new THREE.GridHelper(grid_size, cell_size);
  grid.material.color = new THREE.Color( 0xAAAAAA );
  grid.position.set(0,0,0);
  scene.add(grid);

  // 軸をセット
  SetAxis(grid.up, grid_size);
}

function SetAxis(up, len){
  //geometryの宣言と生成
  var geometry1 = new THREE.Geometry();
  var geometry2 = new THREE.Geometry();
  //線オブジェクト
  var line1, line2;
  
  //頂点座標の追加
  if(1 == up.x){
    geometry1.vertices.push( new THREE.Vector3( 0,  len,    0 ) ); 
    geometry1.vertices.push( new THREE.Vector3( 0, -len,    0 ) );
    geometry2.vertices.push( new THREE.Vector3( 0,    0,  len ) ); 
    geometry2.vertices.push( new THREE.Vector3( 0,    0, -len ) );
    line1 = new THREE.Line( geometry1, new THREE.LineBasicMaterial( { color: 0x00FF00 } ) );
    line2 = new THREE.Line( geometry2, new THREE.LineBasicMaterial( { color: 0x0000FF } ) );
  }
  else if(1 == up.y){
    geometry1.vertices.push( new THREE.Vector3(  len, 0,    0 ) ); 
    geometry1.vertices.push( new THREE.Vector3( -len, 0,    0 ) );
    geometry2.vertices.push( new THREE.Vector3(    0, 0,  len ) ); 
    geometry2.vertices.push( new THREE.Vector3(    0, 0, -len ) );
    line1 = new THREE.Line( geometry1, new THREE.LineBasicMaterial( { color: 0xFF0000 } ) );
    line2 = new THREE.Line( geometry2, new THREE.LineBasicMaterial( { color: 0x0000FF } ) );
  }
  else{
    geometry1.vertices.push( new THREE.Vector3(  len,    0, 0 ) ); 
    geometry1.vertices.push( new THREE.Vector3( -len,    0, 0 ) );
    geometry2.vertices.push( new THREE.Vector3(    0,  len, 0 ) ); 
    geometry2.vertices.push( new THREE.Vector3(    0, -len, 0 ) );
    line1 = new THREE.Line( geometry1, new THREE.LineBasicMaterial( { color: 0xFF0000 } ) );
    line2 = new THREE.Line( geometry2, new THREE.LineBasicMaterial( { color: 0x00FF00 } ) );
  }
  //sceneにlineを追加
  scene.add( line1 );
  scene.add( line2 );
}

// -------- シーン初期化関数 ---------- //
var scene;
function InitScene(){
  scene = new THREE.Scene();
}

// -------- ライト初期化関数 ---------- //
var direct_light;
var ambient_light;
function InitLight(){ 
  // 太陽光をシーンに追加
  direct_light  = new THREE.DirectionalLight(0xCCCCCC, 1.6);
  direct_light.position = new THREE.Vector3(-100, 500, 800);
  scene.add(direct_light);

  // 環境光をシーンに追加
  ambient_light = new THREE.AmbientLight(0x333333);
  scene.add(ambient_light);
}

// -------- オブジェクト描画関数 ---------- //
function InitObject(){
  // データ取得処理
  //var data = LoadObjectData();
  var ini_size = (grid_size * 2 / cell_size) * 2;
  var mesh = new THREE.Mesh(
    new THREE.CubeGeometry(40,40,40),
    new THREE.MeshPhongMaterial({color:0x888888})
  );

  scene.add(mesh);
  mesh.position.set(0,0,0);
}

// -------- 描画更新関数 ---------- //
function RenderLoop(){
  requestAnimationFrame(RenderLoop);
  //controls.update();
  renderer.clear();
  renderer.render(scene, camera);
}

// -------- メイン処理 ---------- //
function main(){
  InitOption();

  InitRenderer();
  InitScene();
  InitCamera();
  InitAxis();
  InitLight();
  InitObject();
  RenderLoop();
};
