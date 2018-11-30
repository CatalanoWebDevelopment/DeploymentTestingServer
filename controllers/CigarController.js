const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Cigar = sequelize.import("../models/cigar");
const validateSession = require("../middleware/validate-session");

/* CREATE CIGAR */
router.post("/create", validateSession, function(req, res) {
  let name = req.body.cigar.name;
  let ringGauge = req.body.cigar.ringGauge;
  let length = req.body.cigar.length;
  let strength = req.body.cigar.strength;
  let wrapperColor = req.body.cigar.wrapperColor;

  Cigar.create({
    name,
    ringGauge,
    length,
    strength,
    wrapperColor
  })
    .then(cigar => res.status(200).json(cigar))
    .then(err => res.json(req.errors));
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
