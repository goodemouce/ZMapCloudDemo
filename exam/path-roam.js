(function () {
    let path;
    fetch('data/layers/13line.json').then(e => e.json()).then(j => {
        path = JSON.parse(j.data.lines[0].xy).map(xy => [...xy, 50]);
    });
    /// 创建路径漫游对象
    const roam = app.map.view.createPathRoam();
    const dema = ui.createDemo('路径漫游');
    dema.addButton('开始漫游', function () {
        //path = CZMAP.transformModelCoordinates(app.currentLayer as CZMAP.ModelLayer, path, 'EPSG:2359', 'EPSG:4326');
        roam.open(path, {
            offset: [-500, 0, 300],
            speed: 160,
            jumpToPath: true,
            model: {
                /// 这里指定漫游时使用的模型
                //url: app.map.mode === CZMAP.MapMode.Mode3D ? 
                //    './data/CesiumGround/Cesium_Ground.gltf' : 
                //    `StaticMesh'/Game/ZMap/Models/汽车/Geometries/Obj3d66-612779-1-775.Obj3d66-612779-1-775'`,
                rotate: [0, 0, 0],
                scale: 100
            }
        });
        ///  这里注册漫游移动事件，可以用于实时显示一些信息
        roam.on('move', function () {
            $('#pos').val(this.currentTime.toFixed(2) + ',' + this.currentSegment);
            $('#position').val(this.currentPosition.join());
        });
        /// 其他设置
        roam.showline = true;
        roam.lockview = true;
        roam.follow = true;
        roam.firstview = false;
        roam.speed = 10;
        roam.modelForward = true;
        roam.loop = CZMAP.PathRoamLoopType.RETURN;
        roam.lineWidth = 3;
        roam.lineColor = 'red';
        roam.start();
    });
    dema.addButton('暂停', () => roam.pause());
    dema.addButton('恢复', () => roam.start());
    dema.addButton('相机跟随', () => roam.follow = !roam.follow);
    dema.addButton('相机锁定', () => roam.lockview = !roam.lockview);
    dema.addButton('前进', () => roam.forward());
    dema.addButton('后退', () => roam.backward());
    dema.addButton('加速', () => roam.speed = roam.speed * 2);
    dema.addButton('减速', () => roam.speed = roam.speed / 2);
    dema.addButton('回到起点', () => roam.currentTime = 0);
    dema.addInput('text', 'pos');
    dema.addInput('text', 'position');
})();
//# sourceMappingURL=path-roam.js.map