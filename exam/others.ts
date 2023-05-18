
namespace app_other
{
    const others = ui.createDemo('其他');

    /// 信息框对象
    let infoWindow :CZMAP.InfoWindow;
    /// 三维地图对象
    let map = app.map;

    /// 创建信息窗
    function createInfoWindow(){
        infoWindow = map.view.createInfoWindow({

            /// 内容，支持html
            content : '内容',
            /// 坐标
            position: [113.889,22.79,30],
            /// 箭头位置
            positioning: 'bottom-center',
            /// 屏幕坐标偏移
            offsetX : 0,
            offsetY : -40,

            /// 关闭前事件
            onClosing(iw)
            {
                return confirm('是否关闭');
            },
            /// 关闭后事件
            onClosed(iw)
            {
                alert('已关闭')
            },
        });
    }

    function closeInfoWindow()
    {
        if (infoWindow && infoWindow.close())
        {
            infoWindow = undefined;
        }
    }

    others.addButton('创建信息框', createInfoWindow);
    others.addButton('关闭信息框', closeInfoWindow);

    

    function addText(ltext:string)
    {
        const label = others.addLabel(ltext);
        label.style.width = '80px';
        label.style.display = 'inline-block';
        const text = others.addInput('text');
        others.addByName('br');

        return text;
    }

    others.addByName('br');
    const pos = addText('pos');
    const heading = addText('heading');
    const pitch = addText('pitch');
    const roll = addText('roll');
    const flyTime = addText('flyTime');

    let cachedInfo = '';
    setInterval(() => {
        const vi = app.map.view.getViewInfo();
        const vis = JSON.stringify(vi);
        if (cachedInfo != vis)
        {
            pos.value = vi.position.map(e => e.toFixed(2)).join();
            heading.value = vi.heading.toFixed(1);
            pitch.value = vi.pitch.toFixed(1);
            roll.value = vi.roll.toFixed(1);
        }
        
        cachedInfo = vis;
    }, 100);

    others.addButton('设置视图信息', ()=>{
        app.map.view.setViewInfo({
            position: pos.value.split(',') as any,
            heading: heading.value as any,
            pitch: pitch.value as any,
            roll: roll.value as any
        }, {
            duration: flyTime.value as any
        });
    });
};