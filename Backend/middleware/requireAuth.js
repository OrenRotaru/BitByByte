const nano = require("nano")(process.env.COUCHDB_URL);
const usersDb = nano.db.use("users");
const jwt = require('jsonwebtoken');
const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usersDb.get(_id, { fields: ['_id'] });
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({error: 'Authorization token invalid'});
    }
}

module.exports = requireAuth;