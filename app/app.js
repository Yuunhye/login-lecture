"use strict";

// 모듈
const express = require('express');
const bodyParser = require("body-parser"); // body를 보기 위한 모듈. body-parser를 사용할 때 미들웨어를 등록해줘야함.
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// 라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));  // public 폴더를 정적 경로로 추가
app.use(bodyParser.json()); //bodyParser가 JSON데이터를 파싱해올 수 있게하기 위함.
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended:true}));

app.use("/", home); // use -> 미들웨어를 등록해주는 메서드.

module.exports = app;