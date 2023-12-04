const express = require("express");
const {
  getMessages,
  getMessagesOfChannel,
  createMessage,
  deleteMessage,
  updateMessage,
  getReplies,
} = require("../controllers/MessageController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require authentication for channel routes
router.use(requireAuth);

// GET all messages
router.get("/", getMessages);

// GET all messages of a channel
router.get("/channel/:id", getMessagesOfChannel);

// GET all replies of a message
router.get("/:id", getReplies);

// POST a message
router.post("/", createMessage);

// DELETE a message
router.delete("/:id", deleteMessage);

// UPDATE a message
router.patch("/:id", updateMessage);

module.exports = router;



