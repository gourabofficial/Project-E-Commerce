const express = require('express');
const router = express.Router();
const ownerModel = require('../model/owner-model');




router.get('/', (req, res) => {
  res.send("working good")
});





// router.post('/create', async (req, res) => {
//   console.log("Received a POST request on /create");
//   try {
//     let owners = await ownerModel.find();
//     console.log("Owners retrieved:", owners);
//     if (owners.length > 0) {
//       return res.status(500).send("Owner already exists");
//     } else {
//       console.log("No owners found, creating a new owner");
//       res.send("We can create a new owner");
//     }
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });




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