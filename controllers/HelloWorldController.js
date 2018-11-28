const router = require("express").Router();

router.get("/", (req, res) => {
  if (!req.errors) {
    res.send("Hello World");
  } else {
    res.status(500).json(req.errors);
  }
});

module.exports = router;
