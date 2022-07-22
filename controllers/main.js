const fs = require("fs");
const req = require("express/lib/request");
const User = require("../model/user");

class Main {
  //Home Page Section
  homeController(req, res) {
    fs.readFile(`${__dirname}/../data/users.json`, "utf-8", (err, data) => {
      // console.log(data);
      res.render("index", {
        message: "Зурвас илгээгдлээ",
        pageTitle: "Нүүр Хуудас",
        users: JSON.parse(data),
      });
    });
  }

  // User Section
  userController(req, res) {
    const id = req.params.id;
    fs.readFile(`${__dirname}/../data/users.json`, "utf-8", (err, data) => {
      const user = JSON.parse(data).find((usr) => usr.id === id);
      res.render("user", {
        usr: user,
      });
    });
  }

  //About Section
  aboutController(req, res) {
    res.render("about", {
      pageTitle: "Тухай",
    });
  }

  //Post Section
  postController(req, res) {
    res.render("post", {
      pageTitle: "Пост",
      posts: ["important post1", "post2"],
    });
  }

  // Credit Section
  creditController(req, res) {
    res.render("credit", {
      pageTitle: "Зохиогч",
      credit: "Б.Бат-оргил",
    });
  }

  // Form Section
  formController(req, res) {
    res.render("form");
  }

  // getUserData Section
  getUserDataController(req, res) {
    const { username, email, password } = req.body;
    const user = new User(username, email, password);
    user.save(email);
    res.redirect("/");
  }

  //getLoginUser Section
  getLoginUserContoller(req, res) {
    // res.render("/");
  }
}

module.exports = new Main();
