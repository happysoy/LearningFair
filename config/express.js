const express = require('express');
const compression = require('compression');


module.exports = function () {
    const app = express();
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(process.cwd() + '/static'));
    
    require("../src/routes/indexRoute")(app);

    return app;
}