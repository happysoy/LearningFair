module.exports = function(app) {
    const index = require("../controllers/indexController");

<<<<<<< HEAD
    app.get('/', index.main);

    app.get('/class', index.class);
=======
    app.get('/', index.login);

    app.post('/loginProcess', index.loginProcess);

    app.get('/main', index.main);
>>>>>>> 18393e1a7f9ae8902ad50c35c7d1cb6ae23e91ed
}