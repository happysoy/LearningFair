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
    const projectList=[];
    const tagList=[];
    const arrMembers=[];
    const arrTeamTitle=[];
    const arrTags=[];
    const refineData =[];
    const thumbnail_url=[];
    const [getClass] = await indexDao.getClass(selectClass);
    const classes = JSON.parse(JSON.stringify(getClass));
    const arrClass = classes[0].eachClass.split(',');
    //console.log(arrClass); class_id
    for(var i=0; i< arrClass.length; i++){
        const [getTeam] = await indexDao.getTeam(arrClass[i]); //팀별 이름
        
        const [getTeamTitle] = await indexDao.getTeamTitle(arrClass[i]);//팀명, 프로젝트이름
        arrTeamTitle[i] = JSON.parse(JSON.stringify(getTeamTitle));
        const [getInfo] = await indexDao.getHashtags(arrClass[i]); //팀별 해시태그
        projectList[i] = JSON.parse(JSON.stringify(getTeam)); //학생(분반)은 여기서 처리하면 됨
        tagList[i] = JSON.parse(JSON.stringify(getInfo));
        arrTags[i] = tagList[i][0].hashtags.split(',');
        arrMembers[i] = projectList[i][0].eachTeam.split(',');
        const [thumbnail_data] = await indexDao.getDatas(arrClass[i]);
        thumbnail_url[i]=JSON.parse(JSON.stringify(thumbnail_data));
        refineData.push({id: projectList[i][0].project_id, team:arrTeamTitle[i][0].team_name, title:arrTeamTitle[i][0].project_name, member: arrMembers[i], tags: arrTags[i], thumbnail:thumbnail_url[i][0].thumbnail_url});
    }
   
    
        

  
    
    //console.log(refineData);
    return res.render("class.ejs",{nickname,selectClass, refineData});
}

exports.team = async function(req, res){
    const params = req.params;
    const idx = params.idx;
    const nickname = req.session.name;
    const arrInfo=[];
    const arrDatas=[];
    arrInfo.push(params.title, params.name,params.member, params.tags);
    const [getDatas] = await indexDao.getDatas(idx);
    arrDatas.push(JSON.parse(JSON.stringify(getDatas)));
  
    return res.render("team.ejs",{nickname, arrInfo, arrDatas});
}

exports.hashtag = async function (req, res){
    const nickname = req.session.name;
    var selectHashtag = req.params.idx;
    console.log("해시태그 선택", selectHashtag);

    const [classProjects] = await indexDao.hashtagProject(selectHashtag);
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
