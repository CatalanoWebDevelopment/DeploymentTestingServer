const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");
const User = sequelize.import("../models/user");

/* CREATE USER */
router.post("/create", function(req, res) {
  let email = req.body.user.email;
  let firstName = req.body.user.firstName;
  let lastName = req.body.user.lastName;
  let password = req.body.user.password;

  User.create({
    email,
    firstName,
    lastName,
    password: bcrypt.hashSync(password, 10)
  }).then(
    function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h"
      });

      res.json({
        user,
        message: "User Created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

/* LOGIN USER */
router.post("/login", function(req, res) {
  User.findOne({ where: { email: req.body.user.email } }).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function(
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: "24h"
            });

            res.json({
              user,
              message: "Successfully Authenticated.",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "Username or Password is Invalid." });
          }
        });
      } else {
        res.status(500).send({ error: "You have failed to authenticate." });
      }
    },
    function(err) {
      res.status(501).send({ error: "Login failed. Please try again." });
    }
  );
});

/* UPDATE USER */
router.put("/:id", function(req, res) {
  if (!req.errors) {
    User.update(req.body.user, { where: { id: req.params.id } })
      .then(user => res.status(200).json(user))
      .then(err => res.status(500).json({ error: err }));
  } else {
    res.status(500).json(req.errors);
  }
});

module.exports = router;
