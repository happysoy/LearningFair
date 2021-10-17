const indexDao = require("../dao/indexDao");
exports.login = async function(req, res){
    let who = req.body.who;
    return res.render("login.ejs",{who});
}

exports.loginProcess = async function(req, res){
    const data = {"status": 200};
    res.send(data)
}
exports.main = async function (req, res){
    return res.render("main.ejs");
}

exports.class = async function(req, res){
    var selectClass = req.params.idx;
    return res.render("class.ejs",{selectClass});
}

exports.hashtag = async function (req, res){
    return res.render("hashtag.ejs");
}