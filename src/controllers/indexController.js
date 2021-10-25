const indexDao = require("../dao/indexDao");

exports.login = async function(req, res){
    return res.render("login.ejs");
}

exports.loginProcess = async function(req, res){
    
    var userData=req.body;
    var userMajor = userData.department;
    var userNum = userData.studentId;
    var userName = userData.userName;
    const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    let status = -1;
    if(userName.length ==1 || !check.test(userName) ){//이름 잘못 입력
        status=201;
        const data = {status};
        res.send(data);
    }
    else if(userNum.length == 1 || isNaN(Number(userNum))) { //학번 잘못 입력
        status=202;
        const data = {status};
        res.send(data);
    }
    else if(userMajor.length==1 || !check.test(userMajor)){ //학과 잘못 입력
        status=203;
        const data = {status};
        res.send(data);
    }
    else{ //로그인 성공
        const loginResult = await indexDao.checkVisitor(userMajor, userNum, userName);
        req.session.name = userName;
        req.session.save(function(){
            const data = {"status": 200, "nickname": userName};
            res.send(data)
        });
    }
   
}

exports.main = async function (req, res){
    const nickname = req.session.name;
    console.log("login name", nickname);
    return res.render("main.ejs", {nickname});
}

exports.class = async function(req, res){
    const nickname = req.session.name;
    var selectClass = req.params.idx;
    console.log("분반 선택", selectClass);
    return res.render("class.ejs",{nickname, selectClass});
}
exports.team = async function(req, res){
    const nickname = req.session.name;
    var selectTeam = req.params.idx;
    console.log("팀 선택", selectTeam);
    return res.render("team.ejs",{nickname, selectTeam});
}

exports.hashtag = async function (req, res){
    const nickname = req.session.name;
    return res.render("hashtag.ejs", {nickname});
}

exports.congratulate = async function (req, res){
    const nickname = req.session.name;
    return res.render("congratulate.ejs", {nickname});
}

exports.awards = async function (req, res){
    const nickname = req.session.name;
    return res.render("awards.ejs", {nickname});
}