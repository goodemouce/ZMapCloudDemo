
# 兆图三维云平台开发示例说明

## 文件结构

```
📦ZMapCloudDemo    -------- 根目录
 ┣ 📂css
 ┣ 📂data          -------- 数据配置
 ┣ 📂exam          -------- 功能示例
 ┣ 📂images        -------- 用到的图标
 ┣ 📂js            -------- JS
 ┣ 📂libs          -------- JS库
 ┣ 📜index.html    -------- 主页
 ┣ 📜README.md     -------- 说明
 ┗ 📜tsconfig.json -------- Typescript配置
```

示例代码开发使用到了typescript，如果不知道typescript，可以忽略所有.ts文件

## 初始化一个简单地图

```js
const option = {
    /// 地图的中心点 
    center: [120.97, 32.07, 0]
    /// 云服务器地址
    singleServer: 'ws://39.108.141.112:81/',
    /// 交互方式
    inputMode: 'Globe'
};

/// 初始化地图
/// 第一个参数：模式
/// 第二个参数：dom id
const map = new CZMAP.ComMap(CZMAP.MapMode.ModeCloud, 'map', option);

/// 初始化地图位置为中心点向上100米
const [cx,cy,cz] = center;
map.view.setViewInfo({
    position:[cx,cy,cz+100],
    heading:10.07305434277713,
    pitch:79.0200529944309,
    roll:0
});
```

参照代码  [app.ts](./js/app.ts#L38)

-------

## 视角控制

### 设置当前视图的位置和视角
``` js
map.view.setViewInfo({
    /// 位置
    position:[108,36,100],
    /// 视图方位角
    heading:10,
    /// 俯仰角
    pitch:45,
    /// 滚转角
    roll:0
}); 
```

### 获取当前视图的位置和视角
``` js
const viewinfo = map.view.getViewInfo();
```

参照代码  [navigate.ts](./exam/navigate.ts)

-------

## 地图事件


```js
/// 注册事件
const events = app.map.view.events;
/// MOUSE_OVER 事件
const overHandle = events.on(CZMAP.MapEventsType.MOUSE_OVER, e => console.info(e); );
/// MOUSE_OUT 事件
const outHandle = events.on(CZMAP.MapEventsType.MOUSE_OUT, e => console.info(e); );
/// 点击事件
const clickHandle = events.on(CZMAP.MapEventsType.MOUSE_CLICK, e => console.info(e) );
/// 右键点击事件
const rclickHandle = events.on(CZMAP.MapEventsType.MOUSE_RCLICK, e => console.info(e) );

/// 注销事件
CZMAP.Observable.unByKey(overHandle);
CZMAP.Observable.unByKey(outHandle);
CZMAP.Observable.unByKey(clickHandle);
CZMAP.Observable.unByKey(rclickHandle);
```

参照代码  [event.ts](./exam/events.ts)

## 图层控制

```js
/// 获取第一个图层
const layer = map.layers.children[0];

// 飞行到图层
layer.flyTo();
// 飞行到图层。指定方位角，高度角和飞行时间（秒）
layer.flyTo({
    heading: 72, pitch: 45, duration: 4
})

// 定位到图层
layer.zoomTo()
// 定位到图层。指定方位角，高度角
layer.flyTo({
    heading: 72, pitch: 45
})

// 显示/隐藏
layer.visible = true;
layer.visible = false;

/// 透明度(部分图层支持透明度属性)
layer.opacity = 0.5;
```


## 示例代码

exam目录中有一些示代码，会自动加载，示例代码通过根UI对象自动创建对应的UI对象，如下：

```ts
//ui为全局对象
//在功能面板中，创建一个“测试”子面板
const demo = ui.createDemo('测试');
//创建一个‘测试点击’的按钮
demo.addButton('测试点击', () => {
    /// do some thing
});
```

