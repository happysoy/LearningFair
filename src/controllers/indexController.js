const indexDao = require("../dao/indexDao");

exports.login = async function(req, res){
    console.log('who');
    return res.render("login.ejs");
}

exports.loginProcess = async function(req, res){
    var userData=req.body;
    var userMajor = userData.department;
    var userNum = userData.studentId;
    var userName = userData.userName;
    const loginResult = await indexDao.checkVisitor(userMajor, userNum, userName);
    req.session.name = userName;
    req.session.save(function(){
        const data = {"status": 200};
        res.send(data)
    });
}

exports.main = async function (req, res){
    const who = req.session.name;
    console.log("login name", who);
    return res.render("main.ejs", {who});
}

exports.class = async function(req, res){
    var selectClass = req.params.idx;
    return res.render("class.ejs",{selectClass});
}

exports.hashtag = async function (req, res){
    return res.render("hashtag.ejs");
}

exports.congratulate = async function (req, res){
    return res.render("congratulate.ejs");
}

exports.awards = async function (req, res){
    return res.render("awards.ejs");
}