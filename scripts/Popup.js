export default class Popup {
  constructor(selectorPopup) {
    this._popup = selectorPopup
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key !== 'Escape') return
    this.close(this._popup)
  }

  open() {
    this._popup.classList.add('popup_is-opened');
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', function (evt) {
      if (
        !evt.target.classList.contains('popup__close') && 
        !evt.target.classList.contains('popup')
      ) return; 

      this.close();
      
    });
  }
}