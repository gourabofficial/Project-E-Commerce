
const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logoutUser} = require('../controllers/authControllers')


router.get('/', (req, res) => {
  res.send("working good (users) ")
});

router.post('/register', registerUser);
router.post("/login", loginUser)
router.get("/logout",logoutUser)

module.exports = router;
