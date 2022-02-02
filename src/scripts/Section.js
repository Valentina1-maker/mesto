export default class Section {
  constructor({ data, renderer }, containerElement) {
    this._items = data;
    this._renderer = renderer;
    this._container = containerElement;
  }

  render() {
    this._items.forEach((item) => {
      const renderedItem = this._renderer(item);
      this.addItem(renderedItem);
    })
  }

  addItem(item) {
    this._container.prepend(item)
  }
}

