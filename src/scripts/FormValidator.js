
export default class FormValidator {
  constructor(config, formValidation) {
    this._config = config
    this._formValidation = formValidation
    this._inputList = Array.from(this._formValidation.querySelectorAll(this._config.inputSelector))
    this._buttonElement = this._formValidation.querySelector(this._config.submitButtonSelector)
  };

  _showErrorName(inputElement, errorMessage) {
    const errorElement = this._formValidation.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideErrorName(inputElement) {
    const errorElement = this._formValidation.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorName(inputElement, inputElement.validationMessage);
    } else {
      this._hideErrorName(inputElement);
    }
  };

  _invalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  toggleButton() {
    if (this._invalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  };

  _setEventListener() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButton();
      });
    });
  };


  enableValidation() {
    this._setEventListener()
  };

}
