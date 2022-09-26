const mysql = require("mysql");

const db = mysql.createConnection ({
    host : process.env.DB_HOST,  //엔드포인트
    user : process.env.DB_USER,
    password : process.env.DB_PSWORD,
    database : process.env.DB_DATABASE,
});

db.connect();  //db 연결 요청

module.exports = db; //db 모듈을 외부에서 사용하기 위함.