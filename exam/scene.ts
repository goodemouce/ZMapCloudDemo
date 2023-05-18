namespace DemoScene
{
    const demo = ui.createDemo('场景');

    demo.addRange2({ title:'时间', default:14, min:0, max:100, callback(input){
        const ue = app.map.view as CZMAP.MapViewUE;
        const value = input.valueAsNumber / 100;
        const hours = (value * 24);
        const hour = hours | 0;
        const mins = ((hours - hour) * 60);
        const min = mins | 0;
        const sec = ((mins - min) * 60) | 0;
        ue.uvapi.initScene({ center: undefined, time: `2022-03-18 ${hour}:${min}:${sec}`, zone: 8 });
    }})
}