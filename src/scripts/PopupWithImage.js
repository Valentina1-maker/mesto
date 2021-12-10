import Popup from '../scripts/Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = popup.querySelector('.popup__image');
    this._description = this._popup.querySelector('.popup__image-description');
  }

  open(event) {
    const target = event.target
    this._image.src = target.src
    this._image.alt = target.alt
    this._description.textContent = target.alt
    super.open()
  }
}
