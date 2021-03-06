import '../pages/index.css'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {
  validationConfig, placePopupElement, formElementProfile, modalPreviuPopup,
  formElemementAvatar, initialCardsContainer, modalProfilePopup, profileEditBtn, modalWindowCards,
  modalAvatarPopup, modalDeleteCard, jobPage, namePage, avatarPage, nameInput, jobInput, cardAddBtn
} from '../utils/constants.js'


const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    Authorization: 'a4d309a8-d7ef-4235-aee4-eee535ca4905',
    'Content-Type': 'application/json'
  }
}
const api = new Api(config)

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((data) => init(data))
  .catch((err) => {
    console.log(err)
  })

function init([userData, initialCards]) {
  const userID = userData._id
  const addCardValidation = new FormValidator(validationConfig, placePopupElement);
  const editProfileValidation = new FormValidator(validationConfig, formElementProfile);
  const editAvatarValidation = new FormValidator(validationConfig, formElemementAvatar);

  const popupOpenImage = new PopupWithImage(modalPreviuPopup);


  addCardValidation.enableValidation();
  editProfileValidation.enableValidation();
  editAvatarValidation.enableValidation();

  const popupFormImg = new PopupWithForm(modalWindowCards, handleCardFormHandler)
  const popupFormProfile = new PopupWithForm(modalProfilePopup, handleProfileFormSubmitHandler)
  const popupFormAvatar = new PopupWithForm(modalAvatarPopup, handleAvatarFormSubmitHandler)
  const popupFormDeleteCard = new PopupWithForm(modalDeleteCard)
  const userInfo = new UserInfo(namePage, jobPage, avatarPage)

  userInfo.setUserAvatar(userData.avatar)
  userInfo.setUserInfo(userData.name, userData.about)


  avatarPage.addEventListener('click', function () {
    editAvatarValidation.toggleButton()
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
      deleteCardCallback
    );
    return card.createCard(api);
  }

  const section = new Section(renderCard, initialCardsContainer);

  section.render(initialCards.reverse())


  function handleCardFormHandler({ cardname, linkcard }) {
    toggleLoading(popupFormImg, false)
    api.createCard({ cardname, linkcard })
      .then(data => {
        section.render([data])
        popupFormImg.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        toggleLoading(popupFormImg, true)
      })
  }


  function deleteCardCallback(card) {
    popupFormDeleteCard.setSubmitAction(() => {
      api.removeCard(card.id())
        .then(() => {
          card.deleteCard();
          popupFormDeleteCard.close();
        })
        .catch(err => console.log(`????????????: ${err}`))
    });
    popupFormDeleteCard.open();
  }

  //?????????????????? ???????????????? ???????????????????? ???????? ???????????????????? ???????????????? 
  cardAddBtn.addEventListener('click', function () {
    addCardValidation.toggleButton()
    popupFormImg.open()
  })

  const toggleLoading = (popup, isLoaded) => {
    if (isLoaded) {
      if (popup === popupFormImg) {
        popup.setSubmitButtonText('??????????????')
      } else {
        popup.setSubmitButtonText('??????????????????')
      }
    } else {
      popup.setSubmitButtonText('????????????????????...')
    }
  }


  function handleAvatarFormSubmitHandler(editLinkAvatar) {
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


  function handleProfileFormSubmitHandler(userData) {
    toggleLoading(popupFormProfile, false)
    api.editProfile(userData)
      .then(data => {
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










