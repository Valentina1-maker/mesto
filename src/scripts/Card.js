
export default class Card {
  constructor(placeData, cardSelector, handleCardClick, api) {
    this._placeData = placeData;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCountrySelector = '.place__like-counter'
    this._api = api
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
    this._element.querySelector('.place__title').textContent = this._placeData.text;
    this._cardImg = this._element.querySelector('.place__img');
    this._cardImg.src = this._placeData.image;
    this._likeCountry = this._element.querySelector(this._likeCountrySelector)
    this._element.querySelector('.place__delete-btn').addEventListener('click', this._deleteCard);
    this._element.querySelector('.place__like').addEventListener('click', this._likeCard);
    this._cardImg.addEventListener('click', this._handleCardClick);

    return this._element
  }

  _deleteCard(event) {
    event.target.closest('.place').remove();
  }

  _likeCard(event) {
    const isLiked = event.target.classList.contains('place__like_active')
    const apiMethod = isLiked ? api.deleteLike : api.addLike
    apiMethod(this._placeData.id)
      .then(answer => {
        this.setLikeCounter(answer.likes.length);
        event.target.classList.toggle('place__like_active')
      }).catch((err) => {
        console.log(err)
      })
  }

  setLikeCounter(number) {
    this._likeCountry.textContent = number
  }
}