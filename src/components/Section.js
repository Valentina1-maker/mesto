export default class Section {
  constructor(renderer, containerElement) {
    this._renderer = renderer;
    this._container = containerElement;
  }

  render(cardList) {
    cardList.forEach((item) => {
      const renderedItem = this._renderer(item);
      this.addItem(renderedItem);
    })
  }

  addItem(item) {
    this._container.prepend(item)
  }
}

