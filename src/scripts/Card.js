export default class Card {
  constructor(placeData, cardSelector, handleCardClick, userID, handleDeleteCallback) {
    this._placeData = placeData;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCallback = handleDeleteCallback;//колбэк после клика на кнопку 
    this._likeCounterSelector = '.place__like-counter';
    this._userID = userID
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


    if(this._userID !== this._placeData.owner._id) {
      this._element.querySelector('.place__delete-btn').classList.add('place__delete-btn_none');
     }

    this._element.querySelector('.place__delete-btn')
     .addEventListener('click', this._handleDeleteCallback);
    this._element.querySelector('.place__like')
      .addEventListener('click', (e) => this._toggleLikeCard(e, api));
    this._cardImg.addEventListener('click', this._handleCardClick);
    //this.setLikeCounter(this._placeData.likes.length)
   // this._likeCounter.textContent = this._placeData.likes.length

    return this._element
  }

  deleteCard(event) {
      event.target.closest('.place').remove();
  }

  // _handleDeleteCallback() {
  //   api.removeCard(this._placeData._id)
  //   .then(answer => console.log(answer))
  // }

  id() {
    console.log(userID)
    return this._userID
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


