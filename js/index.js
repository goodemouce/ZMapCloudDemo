/// 初始化App对象
var app = new DemoApp();
/// 初始化UI
var ui = new ZMap.UI("ui");
function loadDemos() {
    const ss = '//# sourceMappingURL=';
    fetch('./exam/demos.json').then(e => e.json()).then((e) => {
        Promise.all(e.demos.map(es => fetch('./exam/' + es.uri).then(e => e.text()).catch(e => '').then(js => ({ uri: es.uri, js })))).then(ess => {
            ess.forEach(es => {
                try {
                    if (!es.js)
                        return;
                    let pos = es.js.indexOf(ss);
                    if (pos != -1) {
                        pos += ss.length;
                        es.js = es.js.substring(0, pos) + './exam/' + es.js.substring(pos);
                    }
                    ;
                    eval(es.js);
                }
                catch (e) {
                    console.error('load demo error!', es.uri);
                }
            });
        });
    });
}
function bindButtons() {
    const contents = document.querySelectorAll('.left-content');
    const buttons = document.querySelectorAll('#left-titles>button');
    buttons.forEach(bt => {
        bt.addEventListener('click', e => {
            buttons.forEach(b => {
                if (b == bt)
                    b.classList.add('left-title-bt-selected');
                else
                    b.classList.remove('left-title-bt-selected');
            });
            contents.forEach(c => {
                if (c.getAttribute('fname') == bt.innerText) {
                    c.style.display = 'block';
                }
                else {
                    c.style.display = 'none';
                }
            });
        });
    });
}
bindButtons();
loadDemos();
//# sourceMappingURL=index.js.map