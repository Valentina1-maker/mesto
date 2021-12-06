import Card from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import UserInfo from '../scripts/UserInfo.js'

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
};

const placePopupElement = document.querySelector('.popup__form_new-card');
const formElementProfile = document.querySelector('.popup__form_profile');
const modalPreviuPopup = document.querySelector('.root__popup_type_image');
const modalPopups = document.querySelectorAll('.popup')
const addCardValidation = new FormValidator(validationConfig, placePopupElement);
const editProfileValidation = new FormValidator(validationConfig, formElementProfile);
const popupOpenImage = new PopupWithImage(modalPreviuPopup);


addCardValidation.enableValidation();
editProfileValidation.enableValidation();

const modalProfilePopup = document.querySelector('.root__popup_type_profile')
const modalWindowCloseBtns = document.querySelectorAll('.popup__close')
const profileEditBtn = document.querySelector('.profile__edit-button')
const modalSaveBtn = document.querySelector('.popup__submit')
const modalWindowCards = document.querySelector('.root__popup_type_new-card')
const modalCardsSave = document.querySelector('.popup__submit_type_new-card')
const jobPage = document.querySelector('.profile__description')
const namePage = document.querySelector('.profile__title')


const popapFormImg = new PopupWithForm(modalWindowCards, modalCardsSave)
const popapFormProfile = new PopupWithForm(modalProfilePopup, modalSaveBtn)
const userInfo = new UserInfo(namePage, jobPage)


profileEditBtn.addEventListener('click', function () {
  userInfo.setUserInfo();
  popapFormProfile.open();
})

const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')

function addFormSubmitProfile(evt) {
  evt.preventDefault();
  userInfo.getUserInfo()
  namePage.textContent = nameInput.value
  jobPage.textContent = jobInput.value
  popapFormProfile.close()
}

formElementProfile.addEventListener('submit', addFormSubmitProfile);
popapFormImg.setEventListeners();
popapFormProfile.setEventListeners();



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


const section = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '#place-template', popupOpenImage.open.bind(popupOpenImage));
      const elementCard = card.createCard();
      section.addItem(elementCard)
    }
  }, initialCardsContainer);

section.render();


const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__image-description');

//функция дополнительного добавления карточки через попап
const addCard = (event) => {
  event.preventDefault();
  const inputName = placePopupElement.querySelector('.popup__input_type_name-card')
  const name = inputName.value
  const inputLink = placePopupElement.querySelector('.popup__input_type_link')
  const link = inputLink.value

  const item = {
    name: inputName.value,
    link: inputLink.value
  }

  section.addItem(item)

  inputName.value = '';
  inputLink.value = '';

  modalCardsSave.disabled = true;

  popapFormImg.close()
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
  popapFormImg.open()
  modalCardsSave.disabled = true;
})







