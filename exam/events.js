var DemoEvents;
(function (DemoEvents) {
    const demo = ui.createDemo('地图事件');
    const map = app.map;
    const events = app.map.view.events;
    const eventObjects = [];
    /// 绑定事件
    demo.addButton('绑定事件', () => {
        /// MOUSE_OVER 事件
        eventObjects.push(events.on(CZMAP.MapEventsType.MOUSE_OVER, e => { console.info(e); }));
        /// MOUSE_OUT 事假
        eventObjects.push(events.on(CZMAP.MapEventsType.MOUSE_OUT, e => { console.info(e); }));
        /// 点击事件
        eventObjects.push(events.on(CZMAP.MapEventsType.MOUSE_CLICK, (e) => {
            console.info(e);
            /// 点击的模型
            if (e.pickInfo.pickedObject?.properties)
                showProperties(e.pickInfo.pickedObject.properties);
            else if (e.pickInfo.layer?.properties)
                showProperties(e.pickInfo.layer.properties);
            else
                clearProperties();
        }));
        /// 右键点击事件
        eventObjects.push(events.on(CZMAP.MapEventsType.MOUSE_RCLICK, (e) => {
            //app.map.view.lockTo(e.object);
        }));
        app.map.enableTip = true;
    });
    /// 取消绑定事件
    demo.addButton('取消事件', () => {
        CZMAP.Observable.unByKey(eventObjects);
        eventObjects.length = 0;
        app.map.enableTip = false;
    });
    let clickEvent = undefined;
    demo.addButton('拾取坐标', () => {
        if (!clickEvent) {
            /// 注册点击事件
            clickEvent = map.view.events.on(CZMAP.MapEventsType.MOUSE_CLICK, (e) => {
                /// 获取点击的坐标
                alert('坐标：' + e.pickInfo.position);
            });
        }
    });
    demo.addButton('取消拾取坐标', () => {
        /// 取消注册事件 
        CZMAP.Observable.unByKey(clickEvent);
        clickEvent = undefined;
    });
    const table = demo.addTable('');
    /// 显示模型的属性信息
    function showProperties(props) {
        const body = table.querySelector('tbody');
        const list = [];
        for (let key in props) {
            list.push(`<tr><td>${key}</td><td>${props[key]}</td></tr>`);
        }
        body.innerHTML = list.join('');
    }
    function clearProperties() {
        const body = table.querySelector('tbody');
        body.innerHTML = '';
    }
})(DemoEvents || (DemoEvents = {}));
//# sourceMappingURL=events.js.map