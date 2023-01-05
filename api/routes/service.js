const express = require("express");
const router = express.Router();
const serviceModel = require("../model/service");
const mongoose = require("mongoose");

// Get all services
router.get("/", (req, res, next) => {
  try {
    serviceModel.find().then((result) => {
      res.status(200).json({
        serviceData: result,
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

// Get service by id
router.get("/:id", (req, res, next) => {
  // console.log(req.params.id)
  try {
    serviceModel.findById(req.params.id).then((result) => {
      res.status(200).json({
        service: result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// Post new service
router.post("/", (req, res, next) => {
  try {
    const service = new serviceModel({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      excerpt: req.body.excerpt,
      imageUrl: req.body.imageUrl,
    });
    service.save().then((result) => {
      console.log(result);
      res.status(200).json({
        newService: result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// Delete service
router.delete("/:id", (req, res, next) => {
  try {
    serviceModel
      .remove({
        _id: req.params.id,
      })
      .then((result) => {
        res.status(200).json({
          message: "Service Deleted",
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

// Edit service
router.put("/:id", (req, res, next) => {
  serviceModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          excerpt: req.body.excerpt,
          imageUrl: req.body.imageUrl,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        updatedService: result,
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
