var ZMap;
(function (ZMap) {
    class UI {
        _dom;
        _header;
        _content;
        _demos = [];
        constructor(dom) {
            if (dom instanceof HTMLElement)
                this._dom = dom;
            else
                this._dom = document.getElementById(dom);
            this._header = document.createElement('div');
            this._content = document.createElement('div');
            const div = document.createElement('div');
            div.className = 'left-spliter';
            this._header.className = 'ui-headers';
            this._content.className = 'ui-contents';
            this._dom.append(this._header);
            this._dom.append(div);
            this._dom.append(this._content);
        }
        createDemo(name) {
            const header = document.createElement('span');
            const content = document.createElement('div');
            header.className = 'ui-header';
            header.innerText = name;
            content.className = 'ui-content';
            content.style.display = 'none';
            this._header.append(header);
            this._content.append(content);
            ///            
            const demo = new Demo(name, header, content);
            this._demos.push(demo);
            ///
            header.addEventListener('click', () => this.switch(demo));
            /// 
            if (this._demos.length == 1) {
                this.switch(demo);
            }
            ///
            return demo;
        }
        switch(demo) {
            this._demos.forEach(e => {
                e.header.classList.remove('ui-header-active');
                e.content.style.display = 'none';
            });
            demo.header.classList.add('ui-header-active');
            demo.content.style.display = 'block';
        }
    }
    ZMap.UI = UI;
    class Demo {
        _name;
        _header;
        _content;
        constructor(name, header, content) {
            this._name = name;
            this._header = header;
            this._content = content;
        }
        get name() { return this._name; }
        get header() { return this._header; }
        get content() { return this._content; }
        add(element) {
            this._content.append(element);
        }
        addByName(name, options) {
            const dom = document.createElement(name);
            this._content.append(dom);
            return dom;
        }
        addButton(name, callback) {
            const bt = document.createElement('button');
            bt.innerText = name;
            this._content.append(bt);
            bt.addEventListener('click', e => callback(e));
            return bt;
        }
        addLabel(text) {
            const label = this.addByName('label');
            label.textContent = text;
            return label;
        }
        addInput(type, id, callback) {
            const input = document.createElement('input');
            input.type = type;
            input.id = id;
            if (callback) {
                input.addEventListener('input', e => callback(input, e));
            }
            ///
            this._content.append(input);
            ///
            return input;
        }
        addInput2(option) {
            const div = this.addByName('div');
            div.className = 'ui-control ui-control-input';
            if (option.title) {
                const label = document.createElement('span');
                label.textContent = option.title;
                div.append(label);
            }
            const input = document.createElement('input');
            input.type = option.type;
            input.id = option.id;
            if (option.callback) {
                input.addEventListener('input', e => option.callback(input, e));
            }
            div.append(input);
            ///
            return input;
        }
        addRange(min, max, value, callback) {
            const input = this.addInput('range', undefined, callback);
            input.min = min ? min.toString() : '0';
            input.max = max ? max.toString() : '100';
            input.valueAsNumber = value;
            ///
            return input;
        }
        addRange2(option) {
            const div = this.addByName('div');
            div.className = 'ui-control ui-control-range';
            const label = document.createElement('span');
            label.textContent = option.title;
            let input;
            const range = this.addRange(option.min, option.max, option.value, (i, e) => {
                if (input)
                    input.value = range.value;
                if (option.callback)
                    option.callback(range, e);
            });
            range.remove();
            div.append(label);
            div.append(range);
            if (!option.hideText) {
                input = this.addInput('text', undefined, (i, e) => {
                    range.value = input.value;
                    if (option.callback)
                        option.callback(range, e);
                });
                input.remove();
                div.append(input);
            }
            if (CZMAP.defined(option.default)) {
                const bt = this.addButton('↺', (e) => {
                    range.valueAsNumber = option.default;
                    if (input)
                        input.value = option.default;
                    if (option.callback)
                        option.callback(range, e);
                });
                bt.remove();
                div.append(bt);
            }
            return range;
        }
        addSelect(list, callback) {
            const input = document.createElement('select');
            list.forEach((e) => {
                let name, value;
                if (typeof e === 'string') {
                    name = e;
                    value = e;
                }
                else {
                    name = e.name;
                    value = e.value;
                }
                const option = document.createElement('option');
                option.value = value;
                option.innerText = name;
                input.options.add(option);
            });
            ///
            input.addEventListener('change', e => callback(e, input));
            this._content.append(input);
            ///
            return input;
        }
        addTable(name) {
            const table = this.addByName('table');
            table.classList.add('ui-table');
            table.innerHTML = `<thead>
                <tr><th>名称</th><th>属性</th></tr>
            </thead>
            <tbody>
            </tbody>
            `;
            return table;
        }
    }
    ZMap.Demo = Demo;
})(ZMap || (ZMap = {}));
//# sourceMappingURL=ui.js.map