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
    return res.render("main2.ejs");
}