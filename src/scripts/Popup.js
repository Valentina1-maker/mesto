export default class Popup {
  constructor(popup) {
    this._popup = popup
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._closeEscHandler);
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key !== 'Escape') return
    this.close()
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    this._closeEscHandler = (e) => this._handleEscClose(e)
    document.addEventListener('keyup', this._closeEscHandler);
  }


  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (
        !evt.target.classList.contains('popup__close') &&
        !evt.target.classList.contains('popup')
      ) return;
      this.close();
    });
  }
}