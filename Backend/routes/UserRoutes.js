const express = require("express");

// controller functions
const {signupUser, loginUser, patchUser, getUsers, deleteUser} = require("../controllers/UserController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


// get all users
router.get("/", requireAuth, getUsers);

// delete user route
router.delete("/:id", requireAuth, deleteUser);

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// update user route
router.patch("/:id", requireAuth, patchUser);


module.exports = router;