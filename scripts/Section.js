export default class Section {
    constuctor({ data, renderer }, containerSelector) {
        this._items = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderer() {
        this._items.forEach((item) => {
            this._renderer(item)
        })
    }

    addItem(item) {
        this._container.prepend(item)
    }

}