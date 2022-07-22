const express = require("express");
const req = require("express/lib/request");
// const fs = require("fs");
const User = require("../model/user");
const route = express.Router();
const mainController = require("../controllers/main");

route.get("/", mainController.homeController);

route.get("/user/:id", mainController.userController);

route.get("/about", mainController.aboutController);

route.get("/post", mainController.postController);

route.get("/credit", mainController.creditController);

route.get("/form", mainController.formController);

route.post("/getUserData", mainController.getUserDataController);

route.get("/login", (req, res) => {
  res.render("login");
});

route.post("/getLoginUser", mainController.getLoginUserContoller);

route.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  res.render("edit", {
    userData: user,
  });
});

route.post("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  res.redirect("/");

  const updateUser = new User(username, email, password);
  updateUser.save(userId);
});
route.post("/delete-user/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId);
  res.redirect("/");
});

module.exports = route;
