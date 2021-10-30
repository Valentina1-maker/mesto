const modalPopups = document.querySelectorAll('.popup')
const modalProfilePopup = document.querySelector('.root__popup_type_profile')
const modalWindowCloseBtns = document.querySelectorAll('.popup__close')
const profileEditBtn = document.querySelector('.profile__edit-button')
const modalSaveBtn = document.querySelector('.popup__submit')

function openModalWindow(popup) {
  popup.classList.add('popup_is-opened');
}

profileEditBtn.addEventListener('click', function () {
  nameInput.value = namePage.textContent
  jobInput.value = jobPage.textContent

  openModalWindow(modalProfilePopup);
})


function closeModalWindow(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove('popup_is-opened');
}

const handleEscUp = (evt) => {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.keyCode === 27) {
    closeModalWindow(activePopup);
  };
};


modalPopups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')||evt.target.classList.contains('popup')) {
      closeModalWindow(popup);
    }
  });
})


const formElementProfile = document.querySelector('.popup__form_profile')
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
const placeTemplate = document.querySelector('#place-template').content
const modalPreviuPopup = document.querySelector('.root__popup_type_image')


const createCard = (taskName) => {
  const cardElement = placeTemplate.cloneNode(true)

  const cardText = cardElement.querySelector('.place__title')
  cardText.textContent = taskName.name

  const cardLink = cardElement.querySelector('.place__img')
  cardLink.setAttribute('src', taskName.link)
  cardLink.setAttribute('alt', taskName.name)

  // открытие и закрытие модального окна попапа с картинкой

  cardLink.addEventListener('click', () => {
    const popupImage = modalPreviuPopup.querySelector('.popup__image')
    popupImage.setAttribute('src', taskName.link)
    const popupDescription = modalPreviuPopup.querySelector('.popup__image-description')
    popupDescription.textContent = taskName.name

    openModalWindow(modalPreviuPopup)
  })

  const isLiked = cardElement.querySelector('.place__like')
  isLiked.addEventListener('click', (event) => {
    event.target.classList.toggle('place__like_active')
  })

  const cardDeleteBtn = cardElement.querySelector('.place__delete-btn')
  cardDeleteBtn.addEventListener('click', (event) => {
    event.target.closest('.place').remove();
  })
  return cardElement
}

const renderCard = (taskName) => {
  const cardElement = createCard(taskName)
  initialCardsContainer.prepend(cardElement)
};


initialCards.forEach(renderCard)

const placePopupElement = document.querySelector('.popup__form_new-card')

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

  closeModalWindow(modalWindowCards)
}

placePopupElement.addEventListener('submit', addCard)


// открытие и закрытие модального окна создания карточки
const modalWindowCards = document.querySelector('.root__popup_type_new-card')
const profileBtn = document.querySelector('.profile__button')
const modalWindowCardsClose = modalWindowCards.querySelector('.popup__close_type_new-card')
const modalCardsSave = modalWindowCards.querySelector('.popup__submit_type_new-card')
const cardPage = document.querySelector('.place__title')
const linkPage = document.querySelector('.place__img')

profileBtn.addEventListener('click', function () {
  openModalWindow(modalWindowCards);
})






