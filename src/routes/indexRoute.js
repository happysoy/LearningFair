module.exports = function(app) {
    const index = require("../controllers/indexController");

    app.get('/', index.login);

    app.post('/loginProcess', index.loginProcess);

    app.get('/main', index.main);
}