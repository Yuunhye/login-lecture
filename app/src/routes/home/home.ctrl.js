"use strict";

const output = {
    home : (req, res) => {
        res.render('home/index');
    },
    
    login : (req,res)=>{
        res.render('home/login');
    }
}

const users = {
    id : ["dbsgpp", "yuunhye", "orange"],
    password : ["1234", "5678", "123456"]
};

const process = {
    login : (req, res) => {
        const id = req.body.id,
        password = req.body.password;

        if(users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.password[idx] === password) {
                return res.json({
                    success : true
                });    //성공 여부를 json 객체로 응답. 
            }
        }
        return res.json({
            success : false,
            msg : "로그인에 실패하셨습니다."
        })
    }
}

module.exports = {
    output,
    process
};
