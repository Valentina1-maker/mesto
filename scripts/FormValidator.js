
import { config } from '../scripts/index.js'

export default class FormValidator {
  constructor (config, formValidation) {
    this._config = config
    this._formValidation = formValidation
    this._inputList = Array.from(document.querySelectorAll(this._config.formSelector))
    this._buttonElement = this._formValidation.querySelector(selectors.submitButtonSelector)
  };
  
  _isValid = (inputElement) => {
      if (!inputElement.validity.valid) {
          this._showErrorName(inputElement, inputElement.validationMessage);
       } else {
          this._hideErrorName(inputElement);
       }
     };

  _showErrorName = (inputElement, errorMessage) => {
     const errorElement = this._formValidation.querySelector(`.${inputElement.id}-error`)
     inputElement.classList.add(this._formValidation.inputErrorClass);
     errorElement.textContent = errorMessage;
     errorElement.classList.add( this._config.errorClass);
   }

   _hideErrorName = (inputElement) => {
    const errorElement = this._formValidation.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = '';
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass); 
  }
  
  _toggleButton = () => {
    if (invalidInput(inputList)) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  };


  _setEventListener = () => {
    this._toggleButton(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButton();
      });
    });
  };
  

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector))
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
     });
    });
   };

   enableValidation() {
     this._setEventListener()
   }

   _invalidInput = () => {//
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

}


//функция показа ошибки 
//const showErrorName = (formElement, inputElement, errorMessage, selectors) => {
 //const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
 // inputElement.classList.add(selectors.inputErrorClass);
 // errorElement.textContent = errorMessage;
 // errorElement.classList.add(selectors.errorClass);
//}

//функция скрытия ошибки
//const hideErrorName = (formElement, inputElement, selectors) => {
  //const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  //errorElement.textContent = '';
  //inputElement.classList.remove(selectors.inputErrorClass);
  //errorElement.classList.remove(selectors.errorClass); 
//}

//функция проверяющая на валидность формы
//const isValid = (formElement, inputElement, selectors) => {
 // if (!inputElement.validity.valid) {
 //   showErrorName(formElement, inputElement, inputElement.validationMessage, selectors);
 // } else {
 //   hideErrorName(formElement, inputElement, selectors);
//  }
//};

//проверка каждого элемента массива на валидность 
//const invalidInput = (inputList) => {
//  return inputList.some((inputElement) => {
 //   return !inputElement.validity.valid;
 // })
//};

//неактивноость пустых полей
//const toggleButton = (inputList, buttonElement, selectors) => {
//  if (invalidInput(inputList)) {
 //   buttonElement.disabled = true;
//  } else {
//    buttonElement.disabled = false;
//  }
//};

//
//const setEventListener = (formElement, selectors) => {
  //const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector))
  //const buttonElement = formElement.querySelector(selectors.submitButtonSelector)
  //  toggleButton(inputList, buttonElement, selectors);

 // inputList.forEach((inputElement) => {
  //  inputElement.addEventListener('input', (evt) => {
 //     isValid(formElement, inputElement, selectors);
 //     toggleButton(inputList, buttonElement, selectors);
 //   });
//  });
//};

//const enableValidation = (selectors) => {
 // const formList = Array.from(document.querySelectorAll(selectors.formSelector))
 // formList.forEach((formElement) => {
 //   formElement.addEventListener('submit', (evt) => {
 //     evt.preventDefault();
//    });
//    setEventListener(formElement, selectors);
 // });
//};




//enableValidation(selectors)