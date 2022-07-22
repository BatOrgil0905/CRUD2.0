const fs = require("fs");
class User {
  constructor(username, email, password) {
    (this.username = username),
      (this.email = email),
      (this.password = password),
      (this.id = Math.random().toString().split(".")[1]);
  }

  save(id) {
    let users;
    if (fs.existsSync(`${__dirname}/../data/users.json`)) {
      const userlist = fs.readFileSync(
        `${__dirname}/../data/users.json`,
        "utf-8"
      );
      users = [...JSON.parse(userlist)];
    } else {
      users = [];
    }

    const updateUserId = users.find((usr) => usr.id === id);
    if (updateUserId) {
      const updateUsers = [...users];
      const updateIndex = updateUsers.findIndex((usr) => usr.id === id);
      updateUsers[updateIndex].username = this.username;
      updateUsers[updateIndex].email = this.email;
      updateUsers[updateIndex].password = this.password;
      users = updateUsers;
      fs.writeFile(
        `${__dirname}/../data/users.json`,
        JSON.stringify(users),
        (err) => {
          if (!err) {
            console.log("хэрэглэгч шинэчлэгдлээ...");
          } else {
            console.log(err);
          }
        }
      );
    } else {
      const existingUser = users.find((usr) => usr.email === this.email);
      if (!existingUser) {
        users.push(this);

        fs.writeFile(
          `${__dirname}/../data/users.json`,
          JSON.stringify(users),
          (err) => {
            if (!err) {
              console.log("хэрэглэгч үүслээ...");
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log("Имэйл бүртгэлтэй байна...");
      }
    }
  }

  static findById(id) {
    let users;
    if (fs.existsSync(`${__dirname}/../data/users.json`)) {
      const userlist = fs.readFileSync(
        `${__dirname}/../data/users.json`,
        "utf-8"
      );
      users = [...JSON.parse(userlist)];
    } else {
      users = [];
    }
    const existingUser = users.find((usr) => usr.id === id);
    return existingUser;
  }

  static findByIdAndDelete(id) {
    let users;
    if (fs.existsSync(`${__dirname}/../data/users.json`)) {
      const userlist = fs.readFileSync(
        `${__dirname}/../data/users.json`,
        "utf-8"
      );
      users = [...JSON.parse(userlist)];
    } else {
      users = [];
    }

    const updatedUsers = users.filter((usr) => usr.id !== id);
    users = updatedUsers;
    fs.writeFile(
      `${__dirname}/../data/users.json`,
      JSON.stringify(users),
      (err) => {
        if (!err) {
          console.log("хэрэглэгч устлаа...");
        } else {
          console.log(err);
        }
      }
    );
  }
}

module.exports = User;
