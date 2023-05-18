var USE_CESIUM_CAMERA_CONTROLLER = false;
var urlSearchs = new URLSearchParams(location.search);
class DemoApp extends EventTarget {
    /** 地图对象 */
    map;
    /** 当前图层 */
    currentLayer;
    constructor() {
        super();
        this._init();
    }
    async _init() {
        const appconfig = await this._loadConfig();
        const center = appconfig.scene?.center || [113.91778496782854, 22.61831270553515, 0];
        const [cx, cy, cz] = center;
        /// 信号服务器地址
        let signal = urlSearchs.get('signal');
        if (!signal)
            signal = `ws://39.108.141.112:81/`;
        /// 初始化地图视图
        this._initView(center, signal);
        /// 图层树视图（可选）
        this._initTree();
        /// 加载图层
        this._initLayers(appconfig.layers);
        /// 场景复位
        this.map.view.setViewInfo({
            "position": [113.88, 22.56, 21897.14],
            "heading": 10,
            "pitch": 45,
            "roll": 0
        });
    }
    /** 初始化地图视图 */
    _initView(center, signal) {
        const option = {
            center,
            signalServer: signal,
            inputMode: 'Globe'
        };
        /// 初始化地图
        this.map = new CZMAP.ComMap(CZMAP.MapMode.ModeCloud, 'map', option);
    }
    /** 初始化图层树视图（可选） */
    _initTree() {
        const map = this.map;
        /// 初始化图层树视图
        $('#tree').tree({
            checkbox: true,
            lines: true,
            cascadeCheck: false,
            onCheck: function (node, checked) {
                node.attributes.lyr.visible = checked;
            },
            onClick: (node) => {
                this.currentLayer = node.attributes.lyr;
                this.dispatchEvent(new Event('layerSelected'));
            },
            onDblClick: function (node) {
                node.attributes.lyr.zoomTo({ flashColor: 'red' });
            }
        });
        /// 监听“创建图层”事件
        map.layers.addEventListener(CZMAP.LayerManagerEvents.LAYER_ADDED, (event) => {
            const lyr = event.layer;
            let p = lyr.parent;
            if (p['_tree_DOM'])
                p = p['_tree_DOM'].target;
            else
                p = undefined;
            $('#tree').tree('append', {
                parent: p,
                data: [{
                        id: lyr.id,
                        text: lyr.name,
                        checked: lyr.visible,
                        attributes: { lyr: lyr }
                    }]
            });
            lyr['_tree_DOM'] = $('#tree').tree('find', lyr.id);
        });
        /** 监听“移除图层”事件 */
        map.layers.addEventListener(CZMAP.LayerManagerEvents.LAYER_REMOVED, (event) => {
            $('#tree').tree('remove', event.layer['_tree_DOM'].target);
        });
        /** 监听“图层改变”事件 */
        map.layers.addEventListener(CZMAP.LayerManagerEvents.LAYER_VISIBLE_CHANGED, (event) => {
            const lyr = event.layer;
            const node = $('#tree').tree('find', lyr.id);
            node.checked = lyr.visible;
            $('#tree').tree('update', {
                target: node.target,
                checked: lyr.visible
            });
            console.info('onLayerVisible', lyr.name);
        });
    }
    _initLayers(layers) {
        try {
            CZMAPAPP.MapLoader.loadMapLayers(this.map, layers);
        }
        catch (ex) {
            console.error(ex);
        }
    }
    static parseJSON5(json5) {
        return (new Function('return ' + json5))();
    }
    /** 读取配置文件 */
    async _loadConfig() {
        try {
            const layers = urlSearchs.get('layers') || 'layers/dingyi2';
            const text = await fetch(`./data/${layers}.json`).then(e => e.text());
            return DemoApp.parseJSON5(text);
        }
        catch (ex) {
            console.error(ex);
            return { scene: {}, layers: [] };
        }
    }
}
//# sourceMappingURL=app.js.map