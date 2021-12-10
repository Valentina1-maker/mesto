import Popup from '../scripts/Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup)
    this._submitForm = submitForm
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input')
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
    this._form.addEventListener('submit', this._handlerSubmit)
  }

  _handlerSubmit = (event) => {
    event.preventDefault()
    this._submitForm(this._getInputValues())
  }
  

  close() {
    super.close()
  }

}