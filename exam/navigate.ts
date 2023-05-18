namespace DemoNavigate
{
    const naivgate = ui.createDemo('导航');

    function addText(ltext:string)
    {
        const label = naivgate.addLabel(ltext);
        label.style.width = '80px';
        label.style.display = 'inline-block';
        const text = naivgate.addInput('text');
        naivgate.addByName('br');

        return text;
    }

    const pos = addText('position');
    setInterval(() => {
        const vi = app.map.view.getViewInfo();
        pos.value = vi.position.map(e => e.toFixed(2)).join();
        heading.value = vi.heading.toFixed(1);
        pitch.value = vi.pitch.toFixed(1);
        roll.value = vi.roll.toFixed(1);
    })

    const heading = naivgate.addRange2({title: 'H:', min: -180, max:180, value:0, default:0, callback: input => {
        const vi = app.map.view.getViewInfo();
        vi.heading = input.valueAsNumber;
        app.map.view.setViewInfo(vi, { duration : 0 });
    }});
    const pitch = naivgate.addRange2({title: 'P:', min: -90, max:90, value:0, default:0, callback: input => {
        const vi = app.map.view.getViewInfo();
        vi.pitch = input.valueAsNumber;
        app.map.view.setViewInfo(vi, { duration : 0 });
    }});
    const roll = naivgate.addRange2({title: 'R:', min: -90, max:90, value:0, default:0, callback: input => {
        const vi = app.map.view.getViewInfo();
        vi.roll = input.valueAsNumber;
        app.map.view.setViewInfo(vi, { duration : 0 });
    }});

    naivgate.addByName('br');

    
    var viewinfo:CZMAP.ViewInfo ;
    const set_pos = addText('set_pos');

    naivgate.addButton('设置视图信息', ()=>{
        viewinfo.position = set_pos.value.split(',') as any;
        app.map.view.setViewInfo(viewinfo);
    });

    
    naivgate.addButton('获取视图信息', () => {
        viewinfo = app.map.view.getViewInfo();
        alert(JSON.stringify(viewinfo));
    });
}