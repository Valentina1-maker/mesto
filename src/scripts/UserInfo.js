export default class UserInfo {
    constructor(nameUser, infoUser) {
        this._nameUser = nameUser;
        this._infoUser = infoUser;
    }

    getUserInfo() {
        return {
            nameUser: this._nameUser.textContent,
            infoUser: this._infoUser.textContent
        }
    }

    setUserInfo(nameInput, infoInput) {
        this._nameUser.textContent = nameInput.value
        this._infoUser.textContent = infoInput.value
    }
}