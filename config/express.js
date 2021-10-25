const express = require('express');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const compression = require('compression');
const { DB_CONFIG } = require("./database");

module.exports = function () {
    const app = express();
    const sessionStore = new MySQLStore(DB_CONFIG);

    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.engine('html', require('ejs').renderFile);
    app.set("view engine", "ejs");
    

    app.set("views", process.cwd() + "/views");

    app.use(express.static(process.cwd() + '/static'));

    app.use(session({
        key: "session_cookie_name",
        secret: "session_cookie_secret",
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    }));

    require("../src/routes/indexRoute")(app);

    return app;
}