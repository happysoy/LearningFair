const indexDao = require("../dao/indexDao");
exports.login = async function(req, res){
    return res.render("login.ejs");
}

exports.loginProcess = async function(req, res){
    const data = {"status": 200};
    res.send(data)
}
exports.main = async function (req, res){
    return res.render("main.ejs");
}