const modalPopups = document.querySelectorAll('.popup')
const modalProfilePopup = document.querySelector('.root__popup_type_profile')
const modalWindowCloseBtns = document.querySelectorAll('.popup__close')
const profileEditBtn = document.querySelector('.profile__edit-button')
const modalSaveBtn = document.querySelector('.popup__submit')

//функция открытия попапа любого
function openModalWindow(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
}

//функция нажатия кнопки редактирования профиля с открытием попапа редактирования данных профиля
profileEditBtn.addEventListener('click', function () {
  nameInput.value = namePage.textContent
  jobInput.value = jobPage.textContent

  openModalWindow(modalProfilePopup);
})

//функция закрытия попапа в том числе с клавиатуры
function closeModalWindow(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
}

//функция закрытия попапа по клавише Esc
const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.key !== 'Escape') return //если клавиша не Esc то код не выполняется, если Esc, то выбирается класс, который работает, когда попап открыт
  const activePopup = document.querySelector('.popup_is-opened');
  closeModalWindow(activePopup);
};

//функция закрытия попапа по крестику и по оверлею
modalPopups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    //если событие связано с крестиком закрытия или оверлеем то попап закрывать
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModalWindow(popup);
    }
  });
})


const formElementProfile = document.querySelector('.popup__form_profile')
const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')
const jobPage = document.querySelector('.profile__description')
const namePage = document.querySelector('.profile__title')

//отправка данных в профиль при закрытии попапа профиля
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

class Card {
  constructor (text, image, cardSelector) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
     const cardElement = document
     .querySelector(this._cardSelector)
     .content
     .querySelector('.place')
     .cloneNode(true);

     return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.place__title').textContent = this._text;
    this._element.querySelector('.place__img').src = this._image;
    
    return this._element
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link,'#place-template');
  
  const cardElement = card.createCard();
  initialCardsContainer.append(cardElement);
  debugger
});






//const placeTemplate = document.querySelector('#place-template').content
//const modalPreviuPopup = document.querySelector('.root__popup_type_image')

//создание карточки с местами 
//const createCard = (taskName) => {
  //использование шаблона темплейт для создания карточки
  //const cardElement = placeTemplate.cloneNode(true)

 // const cardText = cardElement.querySelector('.place__title')
 // cardText.textContent = taskName.name

 // const cardLink = cardElement.querySelector('.place__img')
 // cardLink.setAttribute('src', taskName.link)
 // cardLink.setAttribute('alt', taskName.name)

  // открытие модального окна попапа с картинкой

 // cardLink.addEventListener('click', () => {
 //   const popupImage = modalPreviuPopup.querySelector('.popup__image')
//    popupImage.setAttribute('src', taskName.link)
 //   const popupDescription = modalPreviuPopup.querySelector('.popup__image-description')
 //   popupDescription.textContent = taskName.name

//    openModalWindow(modalPreviuPopup)
//  })
  
  //функция лайков 
//  const isLiked = cardElement.querySelector('.place__like')
//  isLiked.addEventListener('click', (event) => {
 //   event.target.classList.toggle('place__like_active')
 // })
  
  //функция удаления карточки
//  const cardDeleteBtn = cardElement.querySelector('.place__delete-btn')
 // cardDeleteBtn.addEventListener('click', (event) => {
 //   event.target.closest('.place').remove();
 // })
 // return cardElement
//}

//вставка дополнительной карточки в DOM
//const renderCard = (taskName) => {
 // const cardElement = createCard(taskName)
 // initialCardsContainer.prepend(cardElement)
//};

//вставка элементов массива в DOM
//initialCards.forEach(renderCard)

//const placePopupElement = document.querySelector('.popup__form_new-card')
//const modalWindowCards = document.querySelector('.root__popup_type_new-card')
//const modalCardsSave = document.querySelector('.popup__submit_type_new-card')

//функция дополнительного добавления карточки через попап
//const addCard = (event) => {
  //event.preventDefault();
 // const inputName = placePopupElement.querySelector('.popup__input_type_name-card')
 // const name = inputName.value
  //const inputLink = placePopupElement.querySelector('.popup__input_type_link')
  //const link = inputLink.value

 // renderCard({
 //   name,
 //   link
 // })

  //inputName.value = '';
 // inputLink.value = '';

 // modalCardsSave.disabled = true;

  //closeModalWindow(modalWindowCards)
//}

//слушатель сохранения данных новой карточки
////placePopupElement.addEventListener('submit', addCard)


// открытие  модального окна создания карточки

//const profileBtn = document.querySelector('.profile__button')
//const modalWindowCardsClose = modalWindowCards.querySelector('.popup__close_type_new-card')
//const cardPage = document.querySelector('.place__title')
//const linkPage = document.querySelector('.place__img')

//слушатель открытия модального окна добавления карточки

//profileBtn.addEventListener('click', function () {
 // openModalWindow(modalWindowCards);
//})







