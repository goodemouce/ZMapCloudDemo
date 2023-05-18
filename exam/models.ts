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
}