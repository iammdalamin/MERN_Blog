const express = require("express");
const { Signup, Login, SelectProfile } = require("../controllers/UserController");
const { requireSignIn } = require("../middlewares/AuthVerify");
const router = express.Router();



router.post("/signup", Signup)
router.post("/login", Login)
router.get("/select-profile", requireSignIn ,SelectProfile)


module.exports = router;