import { modalPreviuPopup, popupImage, popupDescription, openModalWindow } from '../scripts/index.js'

export default class Card {
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
    this._cardImg = this._element.querySelector('.place__img');
    this._cardImg.src = this._image;
    this._element.querySelector('.place__delete-btn').addEventListener('click', this._deleteCard);
    this._element.querySelector('.place__like').addEventListener('click', this._likeCard);
    this._cardImg.addEventListener('click', this._modalOpenImg);
    
    return this._element
  }

  _modalOpenImg = () => {
    popupImage.setAttribute('src', this._image);
    popupDescription.textContent = this._text;
    openModalWindow(modalPreviuPopup);
  }

  _deleteCard (event) {
    event.target.closest('.place').remove();
  }

  _likeCard (event) {
    event.target.classList.toggle('place__like_active')
  }

}