module.exports = function(app) {
    const index = require("../controllers/indexController");

    app.get('/', index.main);

    app.get('/class', index.class);
}