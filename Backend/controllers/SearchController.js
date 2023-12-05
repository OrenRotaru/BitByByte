const nano = require("nano")(process.env.COUCHDB_URL);
const messagesDb = nano.db.use("messages");
const usersDb = nano.db.use("users");
const channelsDb = nano.db.use("channels");

const debug = process.env.DEBUG || false; // Debug mode

const SearchController = {

    // Search for users
    searchUsers: async (req, res) => {
        try {
            let {searchTerm} = req.body;

            // Determine sort field and order
            let sortField = 'totalUserLikes';
            let sortOrder = 1; // 1 for descending order, -1 for ascending order

            if (searchTerm.endsWith('~l')) {
                sortField = 'totalUserLikes';
                sortOrder = -1;
            } else if (searchTerm.endsWith('l')) {
                sortField = 'totalUserLikes';
                sortOrder = 1;
            } else if (searchTerm.endsWith('~p')) {
                sortField = 'totalPosts';
                sortOrder = -1;
            } else if (searchTerm.endsWith('p')) {
                sortField = 'totalPosts';
                sortOrder = 1;
            }

            searchTerm = searchTerm.replace(/(~[lp]|[lp])$/, '');
            searchTerm = searchTerm.trim();

            console.log("searchTerm: ", searchTerm," sortField: ", sortField, " sortOrder: ", sortOrder);

            let users;
            if (searchTerm === '%all%') {
                users = await usersDb.find({
                    selector: {},
                    fields: ['_id', 'username', 'email'],
                    limit: 5
                });
            } else {
                users = await usersDb.find({
                    selector: {
                        username: { "$regex": searchTerm}
                    },
                    fields: ['_id', 'username', 'email'],
                    limit: 5
                });
            }
    
            // Calculate totalUserLikes for each user and the totalPosts
            for (let user of users.docs) {
                const messages = await messagesDb.find({
                    selector: {
                        author: user.username
                    },
                    fields: ['likesCount']
                });
                user.totalUserLikes = messages.docs.reduce((total, message) => total + message.likesCount, 0);
                user.totalPosts = messages.docs.length;

            }


            // Sort users
            users.docs.sort((a, b) => sortOrder * (b[sortField] - a[sortField]));
    
            res.status(200).json(users.docs);
            if (debug) console.log("sent users to client");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Search for messages
    searchMessages: async (req, res) => {
        // Create index on likesCount
        messagesDb.createIndex({
            index: {
                fields: ['likesCount']
            }
        }).then(() => {
            console.log('Index created successfully');
        }).catch((err) => {
            console.error('Error creating index', err);
        });

        try {
            const {searchTerm} = req.body;
            let messages;
            let sortOrder = searchTerm.endsWith('~') ? 'asc' : 'desc';

            if (searchTerm.startsWith('%all% u/')) {
                const username = searchTerm.slice(8).replace(/~$/, '').trim();
                messages = await messagesDb.find({
                    selector: {
                        author: { "$regex": username }
                    },
                    fields: ["body", "_id", "author", "likesCount", "channel", "timeStamp"],
                    sort: [{"likesCount": sortOrder}],
                    limit: 5
                });
            } else if (searchTerm.startsWith('%all%')) {
                messages = await messagesDb.find({
                    selector: {},
                    fields: ["body", "_id", "author", "likesCount", "channel", "timeStamp"],
                    sort: [{"likesCount": sortOrder}],
                    limit: 5
                });
            } else if (searchTerm.startsWith('u/')) {
                const modifiedSearchTerm = searchTerm.replace(/(?<=.+:):/g, "%$#");
                let [username, term] = searchTerm.slice(2).split(':', 2);

                if (term) {
                    term = term.replace(/~$/, '').replace(/%\$#/g, ':').trim();
                }
                username = username.trim();
                console.log(username, " ", term);
                messages = await messagesDb.find({
                    selector: {
                        author: { "$regex": username},
                        body: { "$regex": term }
                    },
                    fields: ["body", "_id", "author", "likesCount", "channel", "timeStamp"],
                    sort: [{"likesCount": sortOrder}],
                    limit: 5
                });
            } else {
                messages = await messagesDb.find({
                    selector: {
                        body: { "$regex": searchTerm }
                    },
                    fields: ["body", "_id", "author", "likesCount", "channel", "timeStamp"],
                    sort: [{"likesCount": sortOrder}],
                    limit: 5
                });
            }

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