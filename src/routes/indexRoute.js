const index = require("../controllers/indexController");
module.exports = function(app) {
    //login page
    app.get('/', index.login);
    //login process
    app.post('/loginProcess', index.loginProcess);
    //main page
    app.get('/main', index.main);
    //분반 상세 페이지
    app.get('/class/:idx', index.class);
    //해시태그 상세 페이지
    app.get('/hashtag/:idx', index.hashtag);
    //top50 상세 페이지
    app.get('/top50Project',index.top50Project);
    //랜덤페이지 상세 페이지
    app.get('/allProject',index.allProject);
    //팀별 상세 페이지
    app.get('/team/:class/:idx', index.team);
    //조아여
    app.post('/good',index.good);
    //시러여
    app.post('/bad',index.bad);
    //축사 페이지
    app.get('/congratulate', index.congratulate);
    //시상식 페이지
    app.get('/awards',index.awards);

}