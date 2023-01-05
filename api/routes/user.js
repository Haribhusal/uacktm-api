const express = require("express");
const router = express.Router();
const userModel = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
// Get all users
router.get("/", (req, res, next) => {
  try {
    userModel.find().then((result) => {
      res.status(200).json({
        userData: result,
        count: result.length,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// Get user by id
router.get("/:id", (req, res, next) => {
  // console.log(req.params.id)
  try {
    userModel.findById(req.params.id).then((result) => {
      res.status(200).json({
        user: result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// Post new user
router.post("/", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        gender: req.body.gender,
      });

      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            newUser: result,
          });
        })
        .then((err) => {
          console.log(err).res.status(500).json({
            error: err,
          });
        });
    }
  });
});

// Delete user data
router.delete("/:id", (req, res, next) => {
  try {
    userModel
      .remove({
        _id: req.params.id,
      })
      .then((result) => {
        res.status(200).json({
          message: "user Deleted",
          result: result,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// Edit user data
router.put("/:id", (req, res, next) => {
  userModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          gender: req.body.gender,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        updatedUser: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
