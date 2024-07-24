// routes.js
const express = require("express");
const router = express.Router();
const {login , signup}   = require("../controller/auth/userauth")
const {changePassword , getProfile , updateProfile } = require("../controller/auth/profile")

router.post("/changePassword", changePassword);
router.post("/userLogin", login);
router.get("/getprofile",getProfile);
router.put("/updateProfile" ,updateProfile)


module.exports = router;
