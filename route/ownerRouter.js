const express = require('express');
const router = express.Router();
const ownerModel = require('../model/owner-model');




router.get('/', (req, res) => {
  res.send("working good")
});



if (process.env.NODE_ENV === "development") {
  router.post('/create',async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.send("owner already here")
    }

    let { fulname, email, password } = req.body;
   let createdOwner = await ownerModel.create({
      fulname,
      email,
      password,
    })

    res.send(createdOwner)
    
  });
}


module.exports = router;