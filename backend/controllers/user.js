const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt-nodejs");
exports.getAll = (req, res, next) => {
  User.fetchAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((error) => console.log(error));
};

exports.login = (req, res) => {
  const { username } = req.body;
  User.login(username)
    .then(([rows]) => {
      res
        .status(200)
        .send({
          data: rows,
          message: "Account is registered, successfully login.",
        });
    })
    .catch((err) => {
      res.status(401).send("Failed to login, please try again.");
    });
};
exports.postUser = (req, res) => {
  const {
    firstName,
    lastName,
    address,
    postcode,
    emailAddress,
    username,
    password,
    contactNumber,
  } = req.body;
  const userId = uuidv4();
  //   const hashPassword = bcrypt.hashSync(password);
  const user = new User(
    userId,
    firstName,
    lastName,
    address,
    postcode,
    emailAddress,
    username,
    password,
    contactNumber
  );

  // NOTE: Temporary fix, send data back to front end
  const responseData = {
    userId,
    firstName,
    lastName,
    address,
    postcode,
    emailAddress,
    username,
    password,
    contactNumber,
  };
  user
    .save()
    .then(([rows]) => {
      res
        .status(200)
        .send({ message: "Successfully Added.", data: responseData });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

exports.updateUser = (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    address,
    postcode,
    emailAddress,
    username,
    password,
    contactNumber,
  } = req.body;
  const user = new User(
    userId,
    firstName,
    lastName,
    address,
    postcode,
    emailAddress,
    username,
    password,
    contactNumber
  );
  // NOTE: Temporary fix, send data back to front end
  const responseData = {
    userId,
    firstName,
    lastName,
    address,
    postcode,
    emailAddress,
    username,
    password,
    contactNumber,
  };
  user
    .update()
    .then(([rows]) => {
      res
        .status(200)
        .send({ message: "Successfully updated.", data: responseData });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  User.deleteById(userId)
    .then(() => {
      res.status(200).send("Successfully deleted.");
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

exports.deleteMultipleUser = (req, res) => {
  const { usersId } = req.body;
  User.deleteMultiple(usersId)
    .then((result) => {
      console.log(result);
      res.status(200).send("Successfully deleted.");
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
