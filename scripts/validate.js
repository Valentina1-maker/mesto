
const showErrorName = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
}

const hideErrorName = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showErrorName(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideErrorName(formElement, inputElement);
  }
}

const invalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButton = (inputList, buttonElement) => {
  if (invalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit_inactive');
  }
};

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__submit')
  toggleButton(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButton(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
  setEventListener(formElement);
});
};

enableValidation();


