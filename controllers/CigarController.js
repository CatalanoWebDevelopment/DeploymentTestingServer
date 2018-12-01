const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const validateSession = require("../middleware/validate-session");
const Cigar = sequelize.import("../models/cigar");

/* CREATE CIGAR */
router.post("/create", validateSession, function(req, res) {
  if (!req.errors) {
    const createdCigar = {
      name: req.body.cigar.name,
      ringGauge: req.body.cigar.ringGauge,
      length: req.body.cigar.length,
      strength: req.body.cigar.strength,
      wrapperColor: req.body.cigar.wrapperColor,
      userId: req.body.cigar.userId
    };

    Cigar.create(createdCigar)
      .then(cigar => res.status(200).json(cigar))
      .then(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

/* GET ALL CIGARS */
router.get("/all", validateSession, function(req, res) {
  Cigar.findAll()
    .then(cigar => res.status(200).json(cigar))
    .then(err => res.status(500).json({ err }));
});

/* GET A SPECIFIC CIGAR */
router.get("/:id", validateSession, function(req, res) {
  Cigar.findOne({ where: { id: req.params.id } })
    .then(cigar => res.status(200).json(cigar))
    .then(err => res.status(500).json({ err }));
});

/* UPDATE CIGAR */
router.put("/:id", function(req, res) {
  if (!req.errors) {
    Cigar.update(req.body.cigar, { where: { id: req.params.id } })
      .then(cigar => res.status(200).json(cigar))
      .then(err => res.status(500).json({ err }));
  } else {
    res.status(500).json(req.errors);
  }
});

/* DELETE CIGAR */
router.delete("/:id", function(req, res) {
  if (!req.errors) {
    Cigar.destroy({ where: { id: req.params.id } })
      .then(cigar => res.status(200).json(cigar))
      .then(err => res.status(500).json({ err }));
  } else {
    res.status(500).json(req.errors);
  }
});

module.exports = router;
