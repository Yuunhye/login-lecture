"use strict";

const db = require("../config/db.js");


//파일명과 같은 이름으로 해주는게 좋음
class UserStorage {
    static getUsers( ...fields) {
        return new Promise((resolve, reject)=> {
            db.query("SELECT * FROM users", (err, data) => {
                if(err) reject(err);
                const newUsers = fields.reduce((newUsers, field) => { 
                    var arr = [];
                    if(data[0].hasOwnProperty(field)){
                        for (var i=0; i<data.length; i++) {
                            arr[i] = data[i][field];
                        }
                        newUsers[field] = arr;
                    }
                    return newUsers;
                },{});
                resolve(newUsers);
            })
        })
    }

    static getUserInfo(id) {        //id를 넣어주면 그 id에 해당하는 password, name까지 포함한 object를 반환하는 method.
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query,[id], (err, data) =>{
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        })
    }

    static save(userInfo) {
        return new Promise ((resolve, reject) => {
            const query = "INSERT INTO users(id, name, password) values (?,?,?)";
            db.query(query,[userInfo.id,userInfo.name,userInfo.password],(err)=>{
                if(err) reject(err);
                else resolve({success : true});
            } )
        })
    }
}

module.exports = UserStorage;   //외부에서 UserStorage를 사용하기 위함.