const index = require("../controllers/indexController");
module.exports = function(app) {

    app.get('/', index.login);

    app.post('/loginProcess', index.loginProcess);

    app.get('/main', index.main);

    app.get('/class/:idx', index.class);
    app.get('/hashtag/:idx', index.hashtag);
    
    //banner
    app.get('/top50Project',index.top50Project);
    app.get('/allProject',index.allProject);

    app.get('/team/:idx/:idx', index.team);

    app.get('/congratulate', index.congratulate);
    app.get('/awards',index.awards);

}