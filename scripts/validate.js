
const showErrorName = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

const hideErrorName = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass); 
}


const isValid = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showErrorName(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideErrorName(formElement, inputElement, selectors);
  }
};

const invalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const toggleButton = (inputList, buttonElement, selectors) => {
  if (invalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const setEventListener = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector))
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector)
    toggleButton(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      isValid(formElement, inputElement, selectors);
      toggleButton(inputList, buttonElement, selectors);
    });
  });
};

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, selectors);
  });
};


const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
};

enableValidation(selectors)