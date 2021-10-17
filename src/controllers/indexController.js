const indexDao = require("../dao/indexDao");
const db=require('../../config/mysql');
exports.login = async function(req, res){
    return res.render("login.ejs");
}

exports.loginProcess = async function(req, res){
    var userData=req.body;
    console.log(userData);
    if(userData.checkValue=='visitor'){
        if(userData.userName.length<2){
            console.log(userData.userName);
            var data={status:400};//대충 지정함
            return res.send(data);
            
        }
    }
    if(userData.userName.length<2 || userData.studentId.length<2 || userData.department.length<1){
        var data={status:400};//대충 지정함
        return res.send(data);
    }
    const query= 'INSERT INTO user (user_name, user_num, user_major) VALUES (?,?,?)';
    db.query(query,[userData.userName,userData.studentId,userData.department],(err,result)=>{
        if (err) throw err;
        var data={status:200};
        return res.send(data);
    });
    
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

exports.congratulate = async function (req, res){
    return res.render("congratulate.ejs");
}

exports.awards = async function (req, res){
    return res.render("awards.ejs");
}