const indexDao = require("../dao/indexDao");

exports.login = async function(req, res){
    return res.render("login.ejs");
}

exports.loginProcess = async function(req, res){
    
    var userData=req.body;
    var userMajor = userData.department;
    var userNum = userData.studentId;
    var userName = userData.userName;
    const ko_check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
    const en_check = /[a-zA-Z]/;;

    let status = -1;
    if(userName.length ==1 || ((!ko_check.test(userName) && (!en_check.test(userName)))) ){//이름 잘못 입력
        status=201;
        const data = {status};
        res.send(data);
    }
    else if(userNum.length!=10 || isNaN(Number(userNum))) { //학번 잘못 입력
        status=202;
        const data = {status};
        res.send(data);
    }
    else if(userMajor.length==1 || ((!ko_check.test(userMajor) && (!en_check.test(userMajor))))){ //학과 잘못 입력
        status=203;
        const data = {status};
        res.send(data);
    }
    else{ //로그인 성공
        await indexDao.checkVisitor(userMajor, userNum, userName);
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

    const refineList=[];
    const resultList=[];
    const [classList] = await indexDao.classList(selectClass); 
    const objClass = JSON.parse(JSON.stringify(classList[0])); // parse 와 stringify 둘 중 하나로
    
    const idList = objClass.eachClass.split(',');
    for(var i=0; i< idList.length ; i++){
        const [refineData] = await indexDao.refineData(idList[i]);
        refineList[i] = JSON.parse(JSON.stringify(refineData));
        let info = refineList[i][0];

        resultList.push({id: info.project_id, team: info.team_name, title:info.project_name, tags: info.hashtag_name, members: info.eachMembers, thumbnail: info.thumbnail_url});
    }
    return res.render("class.ejs", {nickname, selectClass, resultList});
}
exports.team = async function(req, res){
    var selectTeams=[];
    selectTeams.push(req.session.isClicked); //내가 선택한 팀들 session에 저장
    const nickname = req.session.name;
    var selectTeam = req.params.idx;
    const [refineData] = await indexDao.refineDataDetail(selectTeam);
    refineList = JSON.parse(JSON.stringify(refineData));
    const result = refineList[0];
    console.log("야야랴ㅑ량", selectTeams);
    return res.render("team.ejs",{nickname, selectTeam,result, selectTeams});
}


exports.hashtag = async function (req, res){

    return res.render("hashtagProject.ejs",{nickname});
}
exports.congratulate = async function (req, res){
    const nickname = req.session.name;
    return res.render("congratulate.ejs", {nickname});
}

exports.awards = async function (req, res){
    const nickname = req.session.name;
    return res.render("awards.ejs", {nickname});
}

exports.top50Project = async function (req, res){
    const nickname = req.session.name;

    return res.render("top50Project.ejs", {nickname});
}


exports.allProject = async function (req, res){
    const nickname = req.session.name;
    
    return res.render("allProject.ejs", {nickname});
}


exports.good = async function(req, res){
    var userData=req.body;
    var refineList = JSON.parse(JSON.stringify(userData));
    var idx = refineList.project_id;
    await indexDao.plusGood(userData);
    req.session.isClicked = idx;
    req.session.save(function(){
        const data = {"status": 200,"isClicked": refineList.project_id};
        res.send(data)
    });
    
}


exports.bad = async function(req, res){
    var userData=req.body;
    await indexDao.minusGood(userData);
    const data = {"status": 200};
    res.send(data);
}