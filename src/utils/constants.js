
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'
  };

  export const placePopupElement = document.querySelector('.popup__form_new-card');
  export const formElementProfile = document.querySelector('.popup__form_profile');
  export const modalPreviuPopup = document.querySelector('.root__popup_type_image');
  export const formElemementAvatar = document.querySelector('.popup__form_avatar');
  export const initialCardsContainer = document.querySelector('.places');

  export const modalProfilePopup = document.querySelector('.root__popup_type_profile')
  export const profileEditBtn = document.querySelector('.profile__edit-button')
  export const modalWindowCards = document.querySelector('.root__popup_type_new-card')
  export const modalAvatarPopup = document.querySelector('.root__popup_type_avatar')
  export const modalDeleteCard = document.querySelector('.root__popup_type_delete')
  export const jobPage = document.querySelector('.profile__description')
  export const namePage = document.querySelector('.profile__title')
  export const avatarPage = document.querySelector('.profile__avatar')

  export const nameInput = formElementProfile.querySelector('.popup__input_type_name')
  export const jobInput = formElementProfile.querySelector('.popup__input_type_description')

  export const cardAddBtn = document.querySelector('.profile__button')