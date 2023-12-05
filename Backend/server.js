require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const setupSocketHandlers = require("./SocketHandlers");
const ChannelRoutes = require("./routes/ChannelRoutes");
const UserRoutes = require("./routes/UserRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const SearchRoutes = require("./routes/SearchRoutes");
const nano = require("nano")(process.env.COUCHDB_URL);
const messagesDb = nano.use('messages');

// middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})




// routes
app.use("/api/channels", ChannelRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/search", SearchRoutes);

// listening
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

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


