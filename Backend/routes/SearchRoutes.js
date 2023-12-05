const express = require("express");
const {
    searchMessages,
    searchUsers
    } = require("../controllers/SearchController");


const router = express.Router();

// search Message route
router.post("/messages", searchMessages);

// search User route
router.post("/users", searchUsers);




module.exports = router;