
const modalWindow = document.querySelector('.popup')
const modalWindowCloseBtn = modalWindow.querySelector ('.popup__close')
const profileEditBtn = document.querySelector ('.profile__edit-button')
const modalSaveBtn = document.querySelector ('.popup__submit')
const cardfileAdd = document.querySelector ('.profile__button')


function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_is-opened');

    nameInput.value = namePage.textContent 
    jobInput.value = jobPage.textContent 
}

profileEditBtn.addEventListener('click', function () {
    openModalWindow(modalWindow);  
})

function closeModalWindow(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
}

modalSaveBtn.addEventListener('click', function () {
    closeModalWindow(modalWindow);   
})

modalWindowCloseBtn.addEventListener('click', function () {
    closeModalWindow(modalWindow);
})

cardfileAdd.addEventListener('click', function () {
    openModalWindow(modalWindow);  
})

let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__input_type_name')
let jobInput = formElement.querySelector('.popup__input_type_description')
let jobPage = document.querySelector('.profile__description')
let namePage = document.querySelector('.profile__title')

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    namePage.textContent = nameInput.value
    jobPage.textContent = jobInput.value 

    closeModalWindow(modalWindow);
}
formElement.addEventListener('submit', formSubmitHandler);

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
  const renderCards = (item) => {
      return `
       <div class="place">
       <img src="${item.link}" class="place__img" alt="Здесь фото мест России">
       <div class="place__text">
          <h3 class="place__title">${item.name}</h3>
          <button type="button" class="place__like"></button>
       </div>
       </div>
      `;
  }

  initialCardsContainer.innerHTML = initialCards.map(card => renderCards(card));




