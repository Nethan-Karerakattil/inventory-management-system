require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();




(async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/inventory-management-system")
            .then(() => console.log("Connected to database"));

        app.listen(process.env.PORT,
            () => console.log(`Server started on port ${process.env.PORT}`));
    } catch(err) {
        throw err;
    }
})();