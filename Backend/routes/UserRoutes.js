const express = require("express");

// controller functions
const {signupUser, loginUser, patchUser, getUsers, getUser, deleteUser} = require("../controllers/UserController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


// get all users
router.get("/", requireAuth, getUsers);

// get user by id
router.get("/:id", requireAuth, getUser);

// delete user route
router.delete("/:id", requireAuth, deleteUser);

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// update user route
router.patch("/:id", requireAuth, patchUser);


module.exports = router;