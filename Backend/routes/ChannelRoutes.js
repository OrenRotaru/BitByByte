const express = require("express");
const {
  createChannel,
  getChannels,
  getChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/ChannelController");
const requireAuth = require("../middleware/requireAuth");


const router = express.Router();

// require authentication for channel routes
router.use(requireAuth);

// GET all channels
router.get("/", getChannels);

// GET a channel
router.get("/:id", getChannel);

// POST a channel
router.post("/", createChannel);

// UPDATE a channel
router.patch("/:id", updateChannel);

// DELETE a channel
router.delete("/:id", deleteChannel);

module.exports = router;
