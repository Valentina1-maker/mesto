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

const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    Authorization: 'a4d309a8-d7ef-4235-aee4-eee535ca4905',
    'Content-Type': 'application/json'
  }
}
const api = new Api(config)


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => init(data))

function init([userData, initialCard]) {
  const userID = userData._id
  const placePopupElement = document.querySelector('.popup__form_new-card');
  const formElementProfile = document.querySelector('.popup__form_profile');
  const modalPreviuPopup = document.querySelector('.root__popup_type_image');
  const formElemementAvatar = document.querySelector('.popup__form_avatar');
  const addCardValidation = new FormValidator(validationConfig, placePopupElement);
  const editProfileValidation = new FormValidator(validationConfig, formElementProfile);
  const editAvatarValidation = new FormValidator(validationConfig, formElemementAvatar)
  const popupOpenImage = new PopupWithImage(modalPreviuPopup);
  const initialCardsContainer = document.querySelector('.places');

  addCardValidation.enableValidation();
  editProfileValidation.enableValidation();
  editAvatarValidation.enableValidation();


  const modalProfilePopup = document.querySelector('.root__popup_type_profile')
  const profileEditBtn = document.querySelector('.profile__edit-button')
  const modalWindowCards = document.querySelector('.root__popup_type_new-card')
  const modalAvatarPopup = document.querySelector('.root__popup_type_avatar')
  const modalDeleteCard = document.querySelector('.root__popup_type_delete')
  const jobPage = document.querySelector('.profile__description')
  const namePage = document.querySelector('.profile__title')
  const avatarPage = document.querySelector('.profile__avatar')



  const popupFormImg = new PopupWithForm(modalWindowCards, addCardFormHandler)
  const popupFormProfile = new PopupWithForm(modalProfilePopup, editProfileFormSubmitHandler)
  const popupFormAvatar = new PopupWithForm(modalAvatarPopup, editAvatarFormSubmitHandler)
  const popupFormDeleteCard = new PopupWithForm(modalDeleteCard)
  const userInfo = new UserInfo(namePage, jobPage, avatarPage)
  console.log(userInfo)

  const nameInput = formElementProfile.querySelector('.popup__input_type_name')
  const jobInput = formElementProfile.querySelector('.popup__input_type_description')


  avatarPage.addEventListener('click', function () {
    popupFormAvatar.open()
  })

  profileEditBtn.addEventListener('click', function () {
    const profileData = userInfo.getUserInfo()
    nameInput.value = profileData.nameUser
    jobInput.value = profileData.infoUser
    popupFormProfile.open();
  })


  function renderCard(item) {
    const card = new Card(
      item,
      '#place-template',
      popupOpenImage.open.bind(popupOpenImage),
      userID,
      deleteCardCallback,
    );
    return card.createCard(api);
  }

  api.getInitialCards()
    .then(() => {
      const section = new Section(
        {
          data: initialCard,
          renderer: renderCard,
        }, initialCardsContainer);

      section.render();
    })
    .catch(err => {
      console.log('Ошибка', err)
    })

  function addCardFormHandler({ cardname, linkcard }) {
    toggleLoading(popupFormImg, false)
    api.createCard({ cardname, linkcard })
      .then(data => {
        const section = new Section(
          {
            data: [data],
            renderer: renderCard,
          }, initialCardsContainer);
        section.render(data)
        popupFormImg.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        toggleLoading(popupFormImg, true)
      })
  }


  const deleteCardCallback = (card) => {
    popupFormDeleteCard.setSubmitAction(() => {
      api.removeCard(card.id())
        .then(() => {
          popupFormDeleteCard.close();
          card.deleteCard();
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    });
    popupFormDeleteCard.open();
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


  function editAvatarFormSubmitHandler(editLinkAvatar) {
    toggleLoading(popupFormAvatar, false)
    const avatarApi = api.editAvatar(editLinkAvatar)
    avatarApi 
      .then(data => {
        userInfo.setUserAvatar(data.avatar) 
        popupFormAvatar.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        toggleLoading(popupFormAvatar, true)
      })
  }


  function editProfileFormSubmitHandler(userData) {
    toggleLoading(popupFormProfile, false)
    api.editProfile(userData)
      .then(data => {
        console.log(data)
        userInfo.setUserInfo(data.name, data.about)
        popupFormProfile.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        toggleLoading(popupFormProfile, true)
      })
  }
}





