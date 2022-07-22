const express = require("express");
const app = express();
const mainRoute = require("./routes/main");
const bp = require("body-parser");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", "pages");

app.use(bp.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(mainRoute);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});