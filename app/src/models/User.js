"use strict"

const UserStorage = require("./UserStorage.js");

class User {
    constructor(body) {     //프론트에서 보낸 body 정보를 가진 생성자
        this.body = body;
    }

    async login() {
        const client = this.body;
        const {id, password} = await UserStorage.getUserInfo(client.id);

        if (id) {   //id가 존재하는지부터 확인
            if (password === client.password) {
                return {success : true};
            }
            return {success : false, msg : "비밀번호가 틀렸습니다."};   //아이디는 존재하는데 비밀번호가 틀린경우
        }
        return {success : false, msg : "존재하지 않는 아이디입니다."};
    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;