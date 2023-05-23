namespace Models
{
    const demo = ui.createDemo('模型');

    let DGJLayer:CZMAP.MoveableLayer;
    demo.addButton('添加盾构机', () => {
        DGJLayer = CZMAP.MapLoader.loadLayer(app.map.rootLayer, {
            "type": "dynActor",
            "name": "盾构机",
            "path": "Blueprint'/Game/ZMap/Models/盾构机/盾构机.盾构机'",
            "visible":true,
            "position": [113.8974541,22.7688977,10],
            "pose": [0,0,0],
            "scale": [1,1,1]
        }) as CZMAP.MoveableLayer;

        DGJLayer.zoomTo();
    });

    demo.addButton('移动盾构机', () => {
        if (DGJLayer)
        {
            // 修改位置
            const [x,y,z] = DGJLayer.position;
            DGJLayer.position = [x, y + 0.00001, z];

            // 修改方向
            const [h,p,r] = DGJLayer.pose;
            DGJLayer.pose = [h+1, p, r]
        }
    });

    demo.addButton('删除模型', () => {
        if (DGJLayer)
        {
            DGJLayer.remove();
            DGJLayer = undefined;
        }
    });


    /// 巷道中心线坐标
    let path:CZMAP.Point[];
    fetch('data/layers/tunnel_line_01.json').then(e => e.json()).then(j => path = j);

    const ent = app.map.view3d.czviewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(108,36,0),
        point: {
            pixelSize: 20
        }
    });

    demo.addRange(0, 100, 0, v => {
        const vnum = v.valueAsNumber / 100 * 1500;
        /// 计算巷道点位和方向
        const p = CZMAP.TunnelUtils.calcPosition(path, 1500, vnum);
        if (DGJLayer)
        {
            DGJLayer.position = p.position;
            DGJLayer.pose = p.pose;
        }
        ///ent.position = Cesium.Cartesian3.fromDegrees(... p.position) as any;
    })
}