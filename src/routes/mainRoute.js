const controller = require("../controllers/menuController");

module.exports = function(app) {
    app.get('/main', controller.getMainPage);
}

