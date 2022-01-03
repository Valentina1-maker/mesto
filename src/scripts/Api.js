//import { config } from "webpack"

export default class Api {
    constructor (config) {
        this._url = config.url
        this._headers = config.headers
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
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


    createCard({ name, link }) {
        return fetch(`${this.url}/cards`, {
            method:'POST',
            header: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => this._checkResponse(res))

    }



    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method:'DELETE',
            header: this.headers,
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

    addLike(cardId) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method:'PUT',
            header: this.headers,
        })

        .then(res => this._checkResponse(res))

    }

    deleteLike(cardId) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method:'DELETE',
            header: this.headers,
        })

        .then(res => this._checkResponse(res))

    }

}