export default class UserInfo {
    constructor (nameUserSelector, infoUserSelector) {
        this._nameUser = nameUserSelector;
        this._infoUser = infoUserSelector;
    }

    getUserInfo() {
        return {
            nameUser: this._nameUser.textContent,
            infoUser:this._infoUser.textContent
        }
    }

   setUserInfo(nameUser, infoUser) {
    this._nameUser.textContent = nameUser;
    this._infoUser.textcontent = infoUser;
   }
}