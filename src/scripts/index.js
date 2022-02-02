import '../pages/index.css'

import Card from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import UserInfo from '../scripts/UserInfo.js'
import Api from '../scripts/Api.js'

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
const addCardValidation = new FormValidator(validationConfig, placePopupElement);
const editProfileValidation = new FormValidator(validationConfig, formElementProfile);
const popupOpenImage = new PopupWithImage(modalPreviuPopup);
const initialCardsContainer = document.querySelector('.places');

addCardValidation.enableValidation();
editProfileValidation.enableValidation();

const modalProfilePopup = document.querySelector('.root__popup_type_profile')
const profileEditBtn = document.querySelector('.profile__edit-button')
const modalWindowCards = document.querySelector('.root__popup_type_new-card')
const jobPage = document.querySelector('.profile__description')
const namePage = document.querySelector('.profile__title')


const popupFormImg = new PopupWithForm(modalWindowCards, addCardFormHandler)
const popupFormProfile = new PopupWithForm(modalProfilePopup, addFormSubmitProfile)
const userInfo = new UserInfo(namePage, jobPage)

const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')

profileEditBtn.addEventListener('click', function () {
  const profileData = userInfo.getUserInfo()
  nameInput.value = profileData.nameUser
  jobInput.value = profileData.infoUser
  popupFormProfile.open();
})

function addFormSubmitProfile(formData) {
  userInfo.setUserInfo(formData.username, formData.userjob);
  popupFormProfile.close();
}

const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    Authorization: '877e654f-87e4-4c4c-b412-ef12e2acf942',
    'Content-Type': 'application/json'
  }
}
const api = new Api(config)
console.log(api)

// const section = new Section(
//   {
//     data: api,
//     renderer: renderCard, 
//   }, initialCardsContainer);



api.getInitialCards()
  .then(data => {
    const section = new Section(
      {
        data,
        renderer: renderCard,
      }, initialCardsContainer);

    section.render();
  })
  .catch(err => {
    console.log('Ошибка', err)
  })

  




//функция дополнительного добавления карточки через попап
// function addCard(formData) {
//   const item = {
//     name: formData.cardname,
//     link: formData.linkcard
//   }

//   renderCard(item)

//   popupFormImg.close()
// }

function renderCard(item) {
  const card = new Card(
    item,
    '#place-template',
    popupOpenImage.open.bind(popupOpenImage)
  );

  return card.createCard(api);
}

// открытие  модального окна создания карточки 
const cardAddBtn = document.querySelector('.profile__button')

//слушатель открытия модального окна добавления карточки 
cardAddBtn.addEventListener('click', function () {
  addCardValidation.toggleButton()
  popupFormImg.open()
})

const toggleLoading = (popup, isLoaded) => {
  if (isLoaded) {
    if (popup === popupFormImg) {
      popup.setSubmitButtonText('Создать')
    } else {
      popup.setSubmitButtonText('Сохранить')
    } 
    } else {
      popup.setSubmitButtonText('Сохранение...')
    }
  }

function addCardFormHandler ({ cardname, linkcard } ) {
  //toggleLoading(popupFormImg, false)
  api.createCard({ cardname, linkcard })
  .then(data => {
    const section = new Section(
      {
        data: [data],
        renderer: renderCard,
      }, initialCardsContainer);
    section.render()
    popupFormImg.close()
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    toggleLoading(popupFormImg, true)
  })
}





