const nano = require("nano")(process.env.COUCHDB_URL);
const messagesDb = nano.db.use("messages");
const usersDb = nano.db.use("users");
const debug = process.env.DEBUG || false; // Debug mode

const MessageController = {

    // Get a list of all messages
    getMessages: async (req, res) => {
        try {
            const body = await messagesDb.list({ include_docs: true });
            // Extracting the actual documents from the response
            const messages = body.rows.map((row) => row.doc);

            // Separate top-level messages and replies
            const topLevelMessages = messages.filter(message => !message.parentMessage_id);
            const replies = messages.filter(message => message.parentMessage_id);

            // Function to attach replies to their parent message
            function attachReplies(message) {
                message.messages = replies.filter(reply => reply.parentMessage_id === message._id);
                message.messages.forEach(attachReplies);
            }

            // Attach replies to top-level messages
            topLevelMessages.forEach(attachReplies);

            res.status(200).json(topLevelMessages);
            if (debug) console.log("sent messages to client");
        } catch (error) {
            if (debug) console.log(error);
            res.status(500).json(error);
        }
    },

    // Get a list of all replies to a specific message
    getReplies: async (req, res) => {
        try {
            const messageId = req.params.id;
            const body = await messagesDb.list({ include_docs: true });
            // Extracting the actual documents from the response
            const messages = body.rows.map((row) => row.doc);

            // Separate the parent message and replies
            const parentMessage = messages.find(message => message._id === messageId);
            const replies = messages.filter(message => message.parentMessage_id);

            // Function to attach replies to their parent message
            function attachReplies(message) {
                message.replies = replies.filter(reply => reply.parentMessage_id === message._id);
                message.replies.forEach(attachReplies);
            }

            // Attach replies to the parent message
            attachReplies(parentMessage);

            res.status(200).json(parentMessage);
            if (debug) console.log("sent replies to client");
        } catch (error) {
            if (debug) console.log(error);
            res.status(500).json(error);
        }
    },
    
    // Get a list of all messages of a channel
    getMessagesOfChannel: async (req, res) => {
        try {
            const channelId = req.params.id;
            if (debug) console.log("channelId: ", channelId);
            const body = await messagesDb.find({
                selector: {
                    channel: channelId
                }
            });
            // Extracting the actual documents from the response
            const messages = body.docs;
    
            // Separate top-level messages and replies
            const topLevelMessages = messages.filter(message => !message.parentMessage_id);
            const replies = messages.filter(message => message.parentMessage_id);
    
            // Function to attach replies to their parent message
            function attachReplies(message) {
                message.messages = replies.filter(reply => reply.parentMessage_id === message._id);
                message.messages.forEach(attachReplies);
            }
    
            // Attach replies to top-level messages
            topLevelMessages.forEach(attachReplies);
    
            res.status(200).json(topLevelMessages);
            if (debug) console.log("sent messages to client");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create a new message
    createMessage: async (req, res) => {
        try {
            const message = req.body;

            const result = await messagesDb.insert(message);
            // send the complete message object back to the client
            const newMessage = await messagesDb.get(result.id);
            res.status(201).json(newMessage);
            if (debug) console.log("created a new message");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a message
    deleteMessage: async (req, res) => {
        try {
            const id = req.params.id;
            const rev = req.params.rev;

            // get the message to be deleted in full
            const messageToBeDeleted = await messagesDb.get(id);


            // delete the message
            const result = await messagesDb.destroy(id, rev);

            res.status(200).json(result);
            if (debug) console.log("deleted message");
        } catch (error) {
            if (debug) console.log("Could not delete message");
            res.status(500).json({ error: error.message });
        }
    },

    // Update a message
    updateMessage: async (req, res) => {
        try {
            const id = req.params.id;
            let message = await messagesDb.get(id);

            // if we are updating the likesCount
            if (req.body.likesCount) {
                // also update the likesCount of the user who owns the message
                const user = await usersDb.find({
                    selector: {
                        username: message.author
                    }
                });
                const userDoc = user.docs[0];
                userDoc.likesCount = userDoc.likesCount + req.body.likesCount;
                await usersDb.insert(userDoc);
            }


            // Merge existing message with new data
            message = { ...message, ...req.body };
            const result = await messagesDb.insert(message);
            // send the complete message object back to the client
            const updatedMessage = await messagesDb.get(result.id);
            res.status(200).json(updatedMessage);
            if (debug) console.log("updated message");
        } catch (error) {
            if (debug) console.log("Could not update message");
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = MessageController;
