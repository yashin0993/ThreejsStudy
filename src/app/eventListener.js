


// resizeイベント
// レンダリングサイズとカメラのアスペクト比を更新
$(window).on("resize",function(){
    var width  = $("#render_view").prop("clientWidth");
    var height = $("#render_view").prop("clientHeight");
    renderer.setSize(width,height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});