require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fs = require("node:fs");

const app = express();

app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./src/views");

(async () => {
    // Connect to Database
    try {
        console.log("Waiting for database connection");
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to database");
    } catch(err) {
        throw err;
    }

    // Start server
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})();

// Load routes
const folders = fs.readdirSync("./src/routes");
for(const folder of folders){
    const files = fs.readdirSync(`./src/routes/${folder}`);
    for(const file of files){
        const route = require(`./routes/${folder}/${file}`);

        for(const method of route.methods){
            app[method.type](route.path, (req, res) => {
                method.execute(app, req, res);
            })
        }
    }
}

app.get("*", (req, res) => {
    res.status(404).send("This page does not exist");
})