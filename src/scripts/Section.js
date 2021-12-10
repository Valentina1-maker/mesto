export default class Section {
    constructor({ data, renderer }, containerElement) {
        this._items = data;
        this._renderer = renderer;
        this._container = containerElement;
    }

    render() {
        this._items.forEach((item) => {
            this._renderer(item)
        })
    }

    addItem(item) {
        this._container.prepend(item)
    }

}