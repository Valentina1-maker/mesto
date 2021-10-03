
const modalWindow = document.querySelector('.popup')
const modalWindowCloseBtn = modalWindow.querySelector ('.popup__close')
const profileEditBtn = document.querySelector ('.profile__edit-button')
const modalSaveBtn = document.querySelector ('.popup__submit')

 function toggleModalWindow() {
    modalWindow.classList.toggle ('popup_is-opened')
}

profileEditBtn.addEventListener('click', toggleModalWindow)
modalSaveBtn.addEventListener('click', toggleModalWindow)
modalWindowCloseBtn.addEventListener('click', toggleModalWindow)

let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__input_type_name')
let jobInput = formElement.querySelector('.popup__input_type_description')


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameInput.value 
    jobInput.value
    let jobPage = document.querySelector('.profile__description')
    let namePage = document.querySelector('.profile__title')
    namePage.textContent = nameInput.value
    jobPage.textContent = jobInput.value
}
formElement.addEventListener('submit', formSubmitHandler);



