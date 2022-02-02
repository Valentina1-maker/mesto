export default class Api {
  constructor (config) {
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
      method:'POST',
      headers: this._headers,
      body: JSON.stringify({
        cardname,
        linkcard
      })
    })
      .then(res => this._checkResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method:'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  editProfile({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => this._checkResponse(res))
  }

  toggleLike(cardId, isDelete) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isDelete ? 'DELETE': 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
}