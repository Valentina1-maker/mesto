import '../pages/index.css'

import Card from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import UserInfo from '../scripts/UserInfo.js'
import Popup from '../scripts/Popup.js'

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


const popapFormImg = new PopupWithForm(modalWindowCards, addCard)
const popapFormProfile = new PopupWithForm(modalProfilePopup, addFormSubmitProfile)
const popapPreviuImg = new Popup(modalPreviuPopup)
const userInfo = new UserInfo(namePage, jobPage)

const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')


profileEditBtn.addEventListener('click', function () {
  const profileData = userInfo.getUserInfo()
  nameInput.value = profileData.nameUser
  jobInput.value = profileData.infoUser
  popapFormProfile.open();
})

function addFormSubmitProfile(formData) {
  userInfo.setUserInfo(formData.username, formData.userjob);
  popapFormProfile.close();
}

popapPreviuImg.open();

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
  const card = new Card(item.name, item.link, '#place-template', popupOpenImage.open.bind(popupOpenImage));
  const elementCard = card.createCard();
  section.addItem(elementCard)
}

const section = new Section(
  {
    data: initialCards,
    renderer: renderCard,
  }, initialCardsContainer);

section.render();

//функция дополнительного добавления карточки через попап
function addCard(formData) {
  const item = {
    name: formData.cardname,
    link: formData.linkcard
  }

  renderCard(item)

  popapFormImg.close()
}


// открытие  модального окна создания карточки
const cardAddBtn = document.querySelector('.profile__button')

//слушатель открытия модального окна добавления карточки

cardAddBtn.addEventListener('click', function () {
  addCardValidation.toggleButton()
  popapFormImg.open()
})







