module.exports = {
    path: "/",
    methods: [
        {
            type: "get",
            execute: (app, req, res) => {
                res.redirect("/login");
            }
        }
    ]
}