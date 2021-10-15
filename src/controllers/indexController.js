const indexDao = require("../dao/indexDao");

exports.main = async function (req, res){
    return res.render("main.ejs");
}

exports.class = async function(req, res){
    return res.render("main2.ejs");
}