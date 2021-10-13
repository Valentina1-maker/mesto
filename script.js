
const modalWindow = document.querySelector('.popup')
const modalWindowCloseBtn = modalWindow.querySelector ('.popup__close')
const profileEditBtn = document.querySelector ('.profile__edit-button')
const modalSaveBtn = document.querySelector ('.popup__submit')


function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
}

profileEditBtn.addEventListener('click', function () {
    openModalWindow(modalWindow);  
})

function closeModalWindow(modalWindow) {
    modalWindow.style.display = 'none';
}

modalSaveBtn.addEventListener('click', function () {
    closeModalWindow(modalWindow);   
})

modalWindowCloseBtn.addEventListener('click', function () {
    closeModalWindow(modalWindow);
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

    if (openModalWindow(modalWindow)) {
    nameInput.textContent = namePage.value
    jobInput.textContent = jobPage.value
    } 
}
formElement.addEventListener('submit', formSubmitHandler);







