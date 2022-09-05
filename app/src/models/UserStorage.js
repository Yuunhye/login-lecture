"use strict";

//파일명과 같은 이름으로 해주는게 좋음
class UserStorage {
    static #users = {
        id : ["dbsgpp", "yuunhye", "orange"],
        password : ["1234", "5678", "123456"],
        name : ["박윤혜", "김김김", "이이이"]
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)){    //users에 field에 해당하는 key값이 존재하냐
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;   //외부에서 UserStorage를 사용하기 위함.