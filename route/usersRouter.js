const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send("working good ")
});

module.exports = router;