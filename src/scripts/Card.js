export default class Card {
  constructor(placeData, cardSelector, handleCardClick) {
    this._placeData = placeData;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCounterSelector = '.place__like-counter'
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
  }

  createCard(api) {
    this._element = this._getTemplate();
    this._element.querySelector('.place__title').textContent = this._placeData.name;
    this._cardImg = this._element.querySelector('.place__img');
    this._cardImg.src = this._placeData.link;
    this._likeCounter = this._element.querySelector(this._likeCounterSelector)
    
    this._element.querySelector('.place__delete-btn')
      .addEventListener('click', this._deleteCard);
    this._element.querySelector('.place__like')
      .addEventListener('click', (e) => this._toggleLikeCard(e, api));
    this._cardImg.addEventListener('click', this._handleCardClick);
    //this.setLikeCounter(this._placeData.likes.length)
   // this._likeCounter.textContent = this._placeData.likes.length

    return this._element
  }

  _deleteCard(event) {
    event.target.closest('.place').remove();
  }

  _toggleLikeCard(event, api) {
    const isLiked = event.target.classList.contains('place__like_active')
    
    api.toggleLike(this._placeData._id, isLiked)
      .then(answer => {
        this.setLikeCounter(answer.likes.length);
        event.target.classList.toggle('place__like_active')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  setLikeCounter(number) {
    this._likeCounter.textContent = number
  }
}
