const db = require("../util/database");

module.exports = class User {
  constructor(
    userId,
    firstName,
    lastName,
    address,
    postcode,
    emailAddress,
    username,
    password,
    contactNumber
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.postcode = postcode;
    this.emailAddress = emailAddress;
    this.username = username;
    this.password = password;
    this.contactNumber = contactNumber;
  }

  save() {
    return db.execute(
      "INSERT INTO users (userId, firstName, lastName, address, postcode, emailAddress, username, password, contactNumber) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        this.userId,
        this.firstName,
        this.lastName,
        this.address,
        this.postcode,
        this.emailAddress,
        this.username,
        this.password,
        this.contactNumber,
      ]
    );
  }
  // UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  update() {
    return db.execute(
      "UPDATE users SET firstName = ?, lastName = ?, address = ?, postcode = ?, emailAddress = ?, username = ?, password = ?, contactNumber = ? WHERE userId = ?",
      [
        this.firstName,
        this.lastName,
        this.address,
        this.postcode,
        this.emailAddress,
        this.username,
        this.password,
        this.contactNumber,
        this.userId,
      ]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM users WHERE users.userId = ?", [id]);
  }

  static deleteMultiple(ids) {
    return db.execute("DELETE FROM users WHERE userId IN ?", [ids]);
  }
  static fetchAll() {
    return db.execute("SELECT * FROM users");
  }

  static login(username) {
    return db.execute("SELECT * FROM users WHERE username = ?", [username]);
  }
};
