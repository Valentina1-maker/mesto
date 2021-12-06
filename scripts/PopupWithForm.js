import Popup from '../scripts/Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup)
    this._submitForm = submitForm
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input')
    this._submit = this._form.querySelector('.popup__submit')
    this._closeForm = document.querySelectorAll('.popup__close')

  }

  _getInputValues() {
    const formData = []
    this._inputs.forEach(input => {
      formData.push(input.value)  
    });
    return formData
  }

  setEventListeners() {
    super.setEventListeners()
    this._submit.addEventListener('submit', () => this._submitForm(this._getInputValues()))
  }

  close() {
    super.close()
  }

}