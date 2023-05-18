namespace Demo
{
    const demo = ui.createDemo('可以移动对象');

    function parseValue3(str:string)
    {
        const v3 = str.split(',').map(s => parseFloat(s));
        if (typeof v3[0] === 'number' &&
            typeof v3[1] === 'number' &&
            typeof v3[2] === 'number')
        {
            return v3 as CZMAP.Point;    
        }
    }

    const rangeLon = createRange('Lon', updatePosition);
    const rangeLat = createRange('Lat', updatePosition);
    const rangeHei = createRange('Hei', updatePosition);
    const inputPos = demo.addInput2({title: '坐标', type:'text', callback: () => {
        const val = parseValue3(inputPos.value);
        if (val)
        {
            select.position = val;
        }
    }});

    ///
    const heading = demo.addRange2({title: 'H:', min: -180, max:180, value:0, default:0, callback: updatePose});
    const pitch =   demo.addRange2({title: 'P:', min: -180, max:180, value:0, default:0, callback: updatePose});
    const roll =    demo.addRange2({title: 'R:', min: -180, max:180, value:0, default:0, callback: updatePose});
    const inputPose = demo.addInput2({title: '姿态', type:'text', callback: () => {
        const val = parseValue3(inputPose.value);
        if (val)
        {
            select.pose = val;
        }
    }});

    let select:CZMAP.MoveableLayer;
    app.addEventListener('layerSelected', e => {
        let position = [0,0,0];
        let pose = [0,0,0];
        if (app.currentLayer instanceof CZMAP.MoveableLayer)
        {
            select = app.currentLayer;
            position = select.position;
            pose = select.pose;
        }
        else
        {
            select = undefined;
        }

        inputPos.value = position.join();
        inputPose.value = pose.join();
        heading.valueAsNumber = pose[0];
        pitch.valueAsNumber = pose[1];
        roll.valueAsNumber = pose[2];
    });

    function updatePose()
    {
        if (select)
        {
            select.pose = [heading.valueAsNumber, pitch.valueAsNumber, roll.valueAsNumber];
            inputPose.value = select.pose.map(v => v.toFixed()).join();
        }
    }

    function updatePosition(name:string, diff:number)
    {
        if (select)
        {
            let [x,y,z] = select.position; 
            let pp = Cesium.Cartesian3.fromDegrees(x, y, z);
            if (app.map.view3d)
            {
                const {width, height} = app.map.view3d.czviewer.canvas;
                const pick = app.map.view3d.pick(width /2, height/2, {pickObject:false, pickPosition:true});
                if (pick && pick.cartesian)
                {
                    pp = pick.cartesian;
                }
            }

            ///
            const vi = app.map.view.getViewInfo();
            const cp = Cesium.Cartesian3.fromDegrees(... vi.position);
            const dist = Cesium.Cartesian3.distance(cp, pp);
            const diffp = (diff / 100.0 * dist);
            switch (name)
            {
            case 'Lon': x += diffp / 111000; break;
            case 'Lat': y += diffp / 111000; break;
            case 'Hei': z += diffp; break;
            }

            select.position = [x, y, z];
            inputPos.value = `${x.toFixed(7)},${y.toFixed(7)},${z.toFixed(1)}`;
        }
    }

    const keyStatus = {
        ctrl: false,
        alt: false,
        shift: false
    }

    document.addEventListener('keydown', e => {
        keyStatus.alt = e.altKey;
        keyStatus.ctrl = e.ctrlKey;
        keyStatus.shift = e.shiftKey;
    });

    document.addEventListener('keyup', e => {
        keyStatus.alt = e.altKey;
        keyStatus.ctrl = e.ctrlKey;
        keyStatus.shift = e.shiftKey;
    });

    function createRange(name:string, callback:(name:string, val:number) => void):HTMLInputElement
    {
        let last = 50;
        const input = demo.addRange2({title: name, hideText: true, callback: (i, e) => {
            const cval = input.valueAsNumber;
            let diff = cval - last;
            if (keyStatus.shift)
                diff /= 10;
            else if (keyStatus.ctrl)
                diff /= 100;
                
            callback(name, diff);
            last = cval;
        }});

        input.onmouseup = () => last = input.valueAsNumber = 50;

        //
        return input;
    }
}