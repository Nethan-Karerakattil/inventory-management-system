const { fileLoader } = require("ejs");

module.exports = {
    path: "/login",
    methods: [
        {
            type: "get",
            execute: (app, req, res) => {
                res.render("./home/login.ejs");
            }
        },
    ]
}
