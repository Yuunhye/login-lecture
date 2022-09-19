"use strict";

const fs = require("fs").promises;

//파일명과 같은 이름으로 해주는게 좋음
class UserStorage {
    
    static #getUserInfo(data,id) {     //은닉화된 method
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);   //users의 key값들로 배열을 만듦. => [id, password, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if(isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)){    //users에 field에 해당하는 key값이 존재하냐
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUsers(isAll, ...fields) {
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUsers(data, isAll, fields);
        })
        .catch(console.error);
    }

    static getUserInfo(id) {        //id를 넣어주면 그 id에 해당하는 password, name까지 포함한 object를 반환하는 method.
        return fs.readFile("./src/databases/users.json")
        .then((data) => {   //readFile이 성공적으로 수행되면 실행
            return this.#getUserInfo(data,id)
        })
        .catch(console.error);     // (err) => console.error(err)
    }

    static async save(userInfo) {
        const users = await this.getUsers(true) 
        if(users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다."
        }
        users.id.push(userInfo.id);
        users.password.push(userInfo.password);
        users.name.push(userInfo.name);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return {success : true};
    }
}

module.exports = UserStorage;   //외부에서 UserStorage를 사용하기 위함.