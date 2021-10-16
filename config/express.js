const express = require('express');
const compression = require('compression');


module.exports = function () {
    const app = express();
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
<<<<<<< HEAD
    app.use(express.static(process.cwd() + '/static'));
    
=======

    app.set("view engine", "ejs");
    app.set("views", process.cwd() + "/views");

    app.use(express.static(process.cwd() + '/static'));

>>>>>>> 18393e1a7f9ae8902ad50c35c7d1cb6ae23e91ed
    require("../src/routes/indexRoute")(app);

    return app;
}