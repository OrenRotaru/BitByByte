const nano = require("nano")(process.env.COUCHDB_URL);
const messagesDb = nano.db.use("messages");
const usersDb = nano.db.use("users");
const channelsDb = nano.db.use("channels");

const debug = process.env.DEBUG || false; // Debug mode

const SearchController = {

    // Search for users
    searchUsers: async (req, res) => {
        try {
            const {searchTerm} = req.body;
            const users = await usersDb.find({
                selector: {
                    username: { "$regex": searchTerm}
                },
                fields: ['_id', 'username', 'email'],
                limit: 5
            });
            res.status(200).json(users.docs);
            if (debug) console.log("sent users to client");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Search for messages
    searchMessages: async (req, res) => {
        try {
            const {searchTerm} = req.body;
            const messages = await messagesDb.find({
                selector: {
                    body: { "$regex": searchTerm }
                },
                fields: ["body", "_id", "author", "channel", "timeStamp"],
                limit: 5
            });

            // Fetch the channel names
            const channelIds = messages.docs.map(message => message.channel);
            const channels = await channelsDb.find({
                selector: {
                    _id: { "$in": channelIds }
                },
                fields: ["_id", "name"]
            });

            // Replace the channel ids with the channel names
            const messagesWithChannelNames = messages.docs.map(message => ({
                ...message,
                channelId: message.channel, // add channelId
                channel: channels.docs.find(channel => channel._id === message.channel).name
            }));

            res.status(200).json(messagesWithChannelNames);
        } catch (error) {
            res.status(500).json(error);
            if (debug) console.log(error);
        }
    }
};

module.exports = SearchController;