const express = require("express");
const urlRoutes = require("./routes/url.routes.js");

const app = express();

app.get("/",(req,res) =>{
    res.send("SERVER CONNECT")
}
)
app.use(express.json());
app.use("/api", urlRoutes);

module.exports = app;