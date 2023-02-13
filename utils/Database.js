const fs = require("fs");

class Database {
  constructor(path) {
    this._path = path;
  }

  setUserData(user) {
    const userJSON = JSON.stringify(user);
    fs.mkdir(`${this._path}/users/${user.id}`, () => {
      fs.writeFile(
        `${this._path}/users/${user.id}/${user.id}.json`,
        userJSON,
        () => {
        }
      );
    });
  }

  getUserData(id) {
    const responce = fs.readFileSync(
      `${this._path}/users/${id}/${id}.json`,
      () => {}
    );
    return JSON.parse(responce);
  }
}

module.exports.Database = Database;
