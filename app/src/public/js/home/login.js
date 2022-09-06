"use strict"

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id : id.value,
        password : password.value
    };
    
    fetch("/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success){
            location.href = "/";    // 로그인에 성공하면 홈화면으로 이동
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {       // 에러 처리
        console.error(new Error("로그인 중 에러 발생"));
    }); //new Error 굳이 안 써도 됨. 쓰면 'Error :' 표시가 추가됨
}

