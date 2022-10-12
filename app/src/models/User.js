"use strict"

const UserStorage = require("./UserStorage.js");

class User {
    constructor(body) {     //프론트에서 보낸 body 정보를 가진 생성자
        this.body = body;
    }

    async login() {
        const client = this.body;
        try{
            const {id, password} = await UserStorage.getUserInfo(client.id) || {};

            if (id) {   //id가 존재하는지부터 확인
                if (password === client.password) {
                    return {success : true};
                }
                return {success : false, msg : "비밀번호가 틀렸습니다."};   //아이디는 존재하는데 비밀번호가 틀린경우
            }
            return {success : false, msg : "존재하지 않는 아이디입니다."};
        } catch (err){
            return {success : false, err}; //key : value 동일하면 key만 입력해도 됨. == err : err
        }
    }

    async register() {
        const client = this.body;
        try{
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            if(err.code == "ER_DUP_ENTRY") {
                err = "이미 존재하는 아이디입니다.";
            }
            else err = `${err.code}`;
            return {success : false, err}
        }
    }
}

module.exports = User;