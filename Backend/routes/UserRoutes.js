const express = require("express");

// controller functions
const {signupUser, loginUser, patchUser} = require("../controllers/UserController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// update user route
router.patch("/:id", requireAuth, patchUser);


module.exports = router;