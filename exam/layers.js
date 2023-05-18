var DemoLayers;
(function (DemoLayers) {
    const demo = ui.createDemo('图层功能');
    let layer;
    app.addEventListener('layerSelected', e => {
        if (app.currentLayer)
            domSelLayer.textContent = '当前图层：' + app.currentLayer.name;
        else
            domSelLayer.textContent = '当前图层：无';
        layer = app.currentLayer;
        updateVisible();
    });
    const domSelLayer = demo.addLabel('当前图层：无');
    demo.addByName('br');
    // 飞行/定位
    demo.addButton('飞行到', () => layer.flyTo());
    demo.addButton('定位到', () => layer.zoomTo());
    // 显示/隐藏
    const button = demo.addButton('显示/隐藏', () => {
        layer.visible = !layer.visible;
        updateVisible();
    });
    /// 透明度
    demo.addRange2({ title: '透明', default: 100, callback(input) {
            layer.opacity = input.valueAsNumber / 100;
        } });
    function updateVisible() {
        button.style.color = layer.visible ? 'red' : 'inherit';
    }
})(DemoLayers || (DemoLayers = {}));
//# sourceMappingURL=layers.js.map