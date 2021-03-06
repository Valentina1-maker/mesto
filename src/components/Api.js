export default class Api {
  constructor(config) {
    this._url = config.url
    this._headers = config.headers
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  createCard({ cardname, linkcard }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardname,
        link: linkcard
      })
    })
      .then(res => this._checkResponse(res))
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  editProfile({ username, userjob }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: userjob
      })
    })
      .then(res => this._checkResponse(res))
  }

  toggleLike(cardId, isDelete) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isDelete ? 'DELETE' : 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  editAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar['avatar'],
      })
    })
      .then(this._checkResponse);
  }
}
