const nano = require("nano")(process.env.COUCHDB_URL);
const channelsDb = nano.db.use("channels");
const debug = process.env.DEBUG || false; // Debug mode

const ChannelController = {
  // Get a list of all channels
  getChannels: async (req, res) => {
    try {
      const body = await channelsDb.list({ include_docs: true });
      // Extracting the actual documents from the response
      const channels = body.rows.map((row) => row.doc);
      res.status(200).json(channels);
      if (debug) console.log("sent channels to client");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get a single channel by id
  getChannel: async (req, res) => {
    try {
      const id = req.params.id;
      const channel = await channelsDb.get(id);
      res.status(200).json(channel);
      if (debug) console.log("sent channel to client");
    } catch (error) {
      res.status(404).json({ error: "Channel not found" });
    }
  },

  // Create a new channel
  createChannel: async (req, res) => {
    try {
      const channel = req.body;
      const result = await channelsDb.insert(channel);
      // send the complete channel object back to the client
      const newChannel = await channelsDb.get(result.id);
      res.status(201).json(newChannel);
      if (debug) console.log("created a new channel");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a channel
  updateChannel: async (req, res) => {
    try {
      const id = req.params.id;
      let channel = await channelsDb.get(id);
      // Merge existing channel with new data
      channel = { ...channel, ...req.body };
      const result = await channelsDb.insert(channel);
      res.status(200).json(result);
      if (debug) console.log("updated channel");
    } catch (error) {
      if (debug) console.log("Could not update channel");
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a channel
  deleteChannel: async (req, res) => {
    try {
      const id = req.params.id;
      const channel = await channelsDb.get(id);
      const result = await channelsDb.destroy(id, channel._rev);
      res.status(200).json(channel);
      if (debug) console.log("deleted channel");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ChannelController;
