export default class Popup {
  constructor(selectorPopup) {
    this._popup = selectorPopup
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key !== 'Escape') return
    this.close()
  }

  open() {
    this._popup.classList.add('popup_is-opened');
  }


  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (
        !evt.target.classList.contains('popup__close') && 
        !evt.target.classList.contains('popup')
      ) return;
      this.close();
    });

    document.addEventListener('keydown', this._handleEscClose);

  }
}