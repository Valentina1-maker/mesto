import Card from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js'

const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__submit', 
  inputErrorClass: 'popup__input_error', 
  errorClass: 'popup__error_active'
};

const placePopupElement = document.querySelector('.popup__form_new-card');
const formElementProfile = document.querySelector('.popup__form_profile');
const addCardValidation = new FormValidator(validationConfig, placePopupElement);
const editProfileValidation = new FormValidator(validationConfig, formElementProfile);

addCardValidation.enableValidation();
editProfileValidation.enableValidation();

const modalPopups = document.querySelectorAll('.popup')
const modalProfilePopup = document.querySelector('.root__popup_type_profile')
const modalWindowCloseBtns = document.querySelectorAll('.popup__close')
const profileEditBtn = document.querySelector('.profile__edit-button')
const modalSaveBtn = document.querySelector('.popup__submit')

export function openModalWindow(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
}

profileEditBtn.addEventListener('click', function () {
  nameInput.value = namePage.textContent
  jobInput.value = jobPage.textContent

  openModalWindow(modalProfilePopup);
})

function closeModalWindow(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
}

const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.key !== 'Escape') return 
  const activePopup = document.querySelector('.popup_is-opened');
  closeModalWindow(activePopup);
};

modalPopups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModalWindow(popup);
    }
  });
})



const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')
const jobPage = document.querySelector('.profile__description')
const namePage = document.querySelector('.profile__title')

function formSubmitHandler(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value
  jobPage.textContent = jobInput.value

  closeModalWindow(modalProfilePopup)
}

formElementProfile.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const initialCardsContainer = document.querySelector('.places');

const renderCard = (item) => {
  const card = new Card(item.name, item.link, '#place-template');
  const elementCard = card.createCard();
  initialCardsContainer.prepend(elementCard);
};


//вставка элементов массива в DOM
initialCards.forEach(renderCard)

export const modalPreviuPopup = document.querySelector('.root__popup_type_image');
export const popupImage = modalPreviuPopup.querySelector('.popup__image');
export const popupDescription = modalPreviuPopup.querySelector('.popup__image-description');

const modalWindowCards = document.querySelector('.root__popup_type_new-card')
const modalCardsSave = document.querySelector('.popup__submit_type_new-card')

//функция дополнительного добавления карточки через попап
const addCard = (event) => {
  event.preventDefault();
  const inputName = placePopupElement.querySelector('.popup__input_type_name-card')
  const name = inputName.value
  const inputLink = placePopupElement.querySelector('.popup__input_type_link')
  const link = inputLink.value

  renderCard({
    name,
    link
  })

  inputName.value = '';
  inputLink.value = '';

  modalCardsSave.disabled = true;

  closeModalWindow(modalWindowCards)
}

//слушатель сохранения данных новой карточки
placePopupElement.addEventListener('submit', addCard)


// открытие  модального окна создания карточки
const profileBtn = document.querySelector('.profile__button')
const modalWindowCardsClose = modalWindowCards.querySelector('.popup__close_type_new-card')
const cardPage = document.querySelector('.place__title')
const linkPage = document.querySelector('.place__img')

//слушатель открытия модального окна добавления карточки

profileBtn.addEventListener('click', function () {
  openModalWindow(modalWindowCards);
})







