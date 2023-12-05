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

            // get the message to be deleted in full
            const messageToBeDeleted = await messagesDb.get(id);

            // get all the messages that are replies to the message to be deleted recursively
            // which means we need to get all the replies of the replies and so on

            // all messages
            const body = await messagesDb.list({ include_docs: true });
            const messages = body.rows.map((row) => row.doc);

            // function to get all the replies recursively
            function getReplies(message) {
                const replies = messages.filter(msg => msg.parentMessage_id === message._id);
                if (replies.length > 0) {
                    replies.forEach(getReplies);
                }
                return replies;
            }

            // get all the replies of the message to be deleted
            const replies = getReplies(messageToBeDeleted);

            // delete all the replies
            replies.forEach(async reply => {
                await messagesDb.destroy(reply._id, reply._rev);
            });

            // send the message in full to be deleted
            res.status(200).json(messageToBeDeleted);

            // delete the message
            const result = await messagesDb.destroy(id, messageToBeDeleted._rev);

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

    // Upvote a message
    upVoteMessage: async (req, res) => {
        try {
            const id = req.params.id;
            if (debug) console.log("request body in upVoteMessage: ", req.body);
            const {user} = req.body;
            
            // log user
            if (debug) console.log("user", user);

            let message = await messagesDb.get(id);


            // Merge existing message with new data
            message = { 
                ...message, 
                likesCount: message.likesCount + 1,
              };

            if (!message.usersThatLiked || !message.usersThatDisliked) {
            message.usersThatLiked = message.usersThatLiked || [];
            message.usersThatDisliked = message.usersThatDisliked || [];
            }

            // if the user that is liking does not exist in the usersThatLiked array or the usersThatDisliked array
            // then add the user to the usersThatLiked array
            if (!message.usersThatLiked.includes(user) && !message.usersThatDisliked.includes(user)) {
                message.usersThatLiked.push(user);
                
            }

            // remove the user from the usersThatDisliked array
            message.usersThatDisliked = message.usersThatDisliked.filter(u => u !== user);

            const result = await messagesDb.insert(message);
            // send the complete message object back to the client
            const updatedMessage = await messagesDb.get(result.id);
            res.status(200).json(updatedMessage);
            if (debug) console.log("upVoted message");
        }
        catch (error) {
            if (debug) console.log("Could not upVote message");
            if (debug) console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Downvote a message
    downVoteMessage: async (req, res) => {
        try {
            const id = req.params.id;
            const {user} = req.body;
            let message = await messagesDb.get(id);

            // Merge existing message with new data
            message = { ...message, likesCount: message.likesCount - 1 };

            if (!message.usersThatLiked || !message.usersThatDisliked) {
                message.usersThatLiked = message.usersThatLiked || [];
                message.usersThatDisliked = message.usersThatDisliked || [];
              }

            // if the user that is disliking does not exist in the usersThatLiked array or the usersThatDisliked array
            // then add the user to the usersThatDisliked array
            if (!message.usersThatLiked.includes(user) && !message.usersThatDisliked.includes(user)) {
                message.usersThatDisliked.push(user);
            }
            // remove the user from the usersThatLiked array
            message.usersThatLiked = message.usersThatLiked.filter(u => u !== user);

            const result = await messagesDb.insert(message);
            // send the complete message object back to the client
            const updatedMessage = await messagesDb.get(result.id);
            res.status(200).json(updatedMessage);
            if (debug) console.log("downVoted message");
        }
        catch (error) {
            if (debug) console.log("Could not downVote message");
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MessageController;
