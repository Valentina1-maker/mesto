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

    setUserInfo(nameInfo, jobInfo) {
        this._nameUser.textContent = nameInfo
        this._infoUser.textContent = jobInfo
    }
}