export default class Card {
  constructor(text, image, cardSelector, handleCardClick) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
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
    this._cardImg.addEventListener('click', this._handleCardClick);

    return this._element
  }

  _deleteCard(event) {
    event.target.closest('.place').remove();
  }

  _likeCard(event) {
    event.target.classList.toggle('place__like_active')
  }

}