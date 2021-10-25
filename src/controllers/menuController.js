const mainDao = require("../dao/mainDao");

module.exports={
    //logo, main
    getMainPage(req,res){return res.render("main.ejs")},//걍 지금 이 화면
    //menu
    getClassPage(req,res){return res.render("class.ejs")},//각 분반 별 프로젝트 화면
    getHashtagPage(req,res){return res.render("hashtag.ejs")},//분야 별(해시태그) 페이지
    getCongratulatePage(req,res){return res.render("congratulate.ejs")},//축사 화면
    getAwardsPage(req,res){return res.render("class.ejs")},//시상식 화면
}
