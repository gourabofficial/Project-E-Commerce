const express = require('express');
const router = express.Router();
const ownerModel = require('../model/owner-model');

router.get('/admin',(req, res) => {
  try {
    let success = req.flash("success");
    res.render("createproducts", { success });
  } catch (error) {
    res.send("Could not load products.");
  }
});

if (process.env.NODE_ENV === "development") {
  router.post('/create', async (req, res) => {
    try {
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        return res.send("Owner already exists");
      }

      let { fullname, email, password } = req.body;
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });

      res.send(createdOwner);
    } catch (error) {
      res.status(500).send("Error creating owner");
    }
  });
}

module.exports = router;