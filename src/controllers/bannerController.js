const mainDao = require("../dao/mainDao");


module.exports={
    //banner
    getAllProjectPage(req,res){return res.render("class.ejs")},//모든 프로젝트 모아보는 페이지
    getTop50Page(req,res){return res.render("top50.ejs")}, //좋아요 상위 50 보여주는 화면
    getRandomProjectPage(req,res){return res.render("randomProject.ejs")}//랜덤으로 프로젝트 하나 보여주기    like 나무위키  
}
