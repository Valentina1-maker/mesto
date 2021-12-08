export default class UserInfo {
    constructor(nameUserSelector, infoUserSelector) {
        this._nameUser = nameUserSelector;
        this._infoUser = infoUserSelector;
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