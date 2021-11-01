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
    else if(userNum.length!=10 || isNaN(Number(userNum))) { //학번 잘못 입력
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

    const refineList=[];
    const resultList=[];
    const [classList] = await indexDao.classList(selectClass); console.el
    const objClass = JSON.parse(JSON.stringify(classList[0])); // parse 와 stringify 둘 중 하나로
    
    const idList = objClass.eachClass.split(',');
    for(var i=0; i< idList.length ; i++){
        const [refineData] = await indexDao.refineData(idList[i]);
        refineList[i] = JSON.parse(JSON.stringify(refineData));
        let info = refineList[i][0];
        console.log(info.eachMembers);
        resultList.push({id: info.project_id, team: info.team_name, title:info.project_name, member: info.eachMembers, tags: info.hashtag_name, thumbnail: info.thumbnail_url});
    }
//project_id, eachMembers, team_name, project_name, class_name, good, hashtag_name, video_url, pdf_url
    return res.render("class.ejs", {nickname, selectClass, resultList});
}

exports.team = async function(req, res){
    const nickname = req.session.name;
    var selectTeam = req.params.idx;
    console.log("팀 선택", selectTeam);
    const resultList=[];
    const [refineData] = await indexDao.refineData(selectTeam);
    refineList = JSON.parse(JSON.stringify(refineData));
    console.log( refineList[0].project_id);
    console.log( refineList[0].eachMembers);
    const result = refineList[0];
    //resultList.push({id: info.project_id, team: info.team_name, title:info.project_name, member: info.eachMembers, tags: info.hashtag_name, thumbnail: info.thumbnail_url, pdf: info.pdf_url, video: info.video_url});

    return res.render("team.ejs",{nickname, selectTeam,result});
}

exports.hashtag = async function (req, res){
    const nickname = req.session.name;
    var selectHashtag = req.params.idx;
    console.log("해시태그 선택", selectHashtag);

    //const [classProjects] = await indexDao.hashtagProject(selectHashtag);
    var objLength = Object.keys(classProjects).length;
    var projectList = [];
    var memberList =[];
    var addList = [];
    for(var i=0; i<objLength; i++){
        projectList[i] = JSON.parse(JSON.stringify(classProjects))[i];
        const [projectMembers] = await indexDao.classTeam(projectList[i].project_id);
        var objLengthMember = Object.keys(projectMembers).length;
        console.log(projectList);
        for(var j=0; j<objLengthMember; j++){
            memberList[j] = JSON.parse(JSON.stringify(projectMembers))[j];
            addList.push({name: memberList[j].student_name, project_id: projectList[i].project_id});
        }
    }
    return res.render("hashtagProject.ejs",{nickname, selectHashtag, addList});
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
