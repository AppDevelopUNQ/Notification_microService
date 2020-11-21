const senderModule = require('./send-mail/sendMail')

class Notify{
    constructor(){
        this._users={}//diccionario de email(k): [artistId](v)
    }

    addUser(email, artistId){
        this._users[email] = [];
        this._users[email].push(artistId);
    }

    getUser(email){
        return this._users[email];
    }

    getAllEmails(){
        return Object.keys(this._users);
    }

    isFollower(user, artistId){
        return this.getUser(user).includes(artistId)
    }

    getAllThatFollow(artistId){
        const users = this.getAllEmails();
        let followers = [];
        for(let i = 0; i < users.length; i++){
            if(this.isFollower(users[i], artistId)){
                followers.push(users[i])
            }
        }
        return followers
    }

    unFollow(email, artistId){
        this._users[email] = this._users[email].filter(elem => elem !== artistId)
    }

    allUnfollow(artistId){
        const users = this.getAllEmails();
        for(let i = 0; i < users.length; i++){
            this.unFollow(users[i], artistId)
        }
    }

    notify(receptor, subject, message){
        senderModule.send(subject, message, receptor)
        return 'ok'
    }
}

module.exports = Notify
