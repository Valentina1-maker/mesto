import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popup, handlerFormData) {
    super(popup)
    this._handlerFormData = handlerFormData
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input')
    this._submitButton = this._form.querySelector('.popup__submit')
    this.setEventListeners()
  }



  setSubmitButtonText(buttonText) {
    this._submitButton.textContent = buttonText
  }

  setSubmitButtonAttribute() {
    this._submitButton.setAttribute('disabled', true)
  }

  setSubmitAction(action) {
    this._handlerFormData = action
  }

  _getInputValues() {
    const formData = {}
    this._inputs.forEach(input => {
      const key = input.getAttribute('name')
      formData[key] = input.value
    });
    console.log(formData)
    return formData
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._handlerSubmit)
  }

  _handlerSubmit = (event) => {
    event.preventDefault()
    this._handlerFormData(this._getInputValues())
  }
  
  close() {
    super.close()
    this._form.reset();
  }
}