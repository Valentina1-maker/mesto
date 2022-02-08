export default class UserInfo {
    constructor(nameUser, infoUser, avatarUserLink, userID) {
        this._nameUser = nameUser;
        this._infoUser = infoUser;
        this._avatarUser = avatarUserLink;
        this._userID = userID
    }

    getUserInfo() {
        return {
            nameUser: this._nameUser.textContent,
            infoUser: this._infoUser.textContent
        }
    }

    setUserInfo(nameInfo, jobInfo) {
        this._nameUser.textContent = nameInfo
        console.log(nameInfo, jobInfo)
        this._infoUser.textContent = jobInfo
    }

    setUserAvatar(avatarUserLink) {
        this._avatarUser.style.backgroundImage = `url(${avatarUserLink})`
    }

    getUserID(userID) {
        return userID
    }

}