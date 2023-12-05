const nano = require("nano")(process.env.COUCHDB_URL);
const usersDb = nano.db.use("users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const debug = process.env.DEBUG || false; // Debug mode

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // check if user exists
  const user = await usersDb.find({
    selector: {
      email: email,
    },
  });
  if (user.docs.length === 0) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  // check if password is correct
  const isMatch = await bcrypt.compare(password, user.docs[0].password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // create token
  const token = createToken(user.docs[0]._id);

  res.status(200).json({ id: user.docs[0]._id, username: user.docs[0].username, email: email, token: token });
};

// signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  // check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "Please enter a valid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ msg: "Please enter a stronger password" });
  }

  // check if user exists
  const response = await usersDb.find({
    selector: {
      email: email,
    },
  });

  if (response.docs.length > 0) {
    if (debug) console.log("User with email: " + email + " already exists.");
    return res.status(400).json({ msg: "User already exists" });
  }

  // okay now we signup the user
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  try {
    // insert user into db
    const result = await usersDb.insert(user);

    // pull the created document from the db using the email
    const response = await usersDb.find({
      selector: {
        email: email,
      },
    });

    // get the _id of the created document
    const createdUserId = response.docs[0]._id;

    // create token
    const token = createToken(createdUserId);

    res.status(200).json({ id: createdUserId, username, email, token });
    if (debug) console.log("User with email: " + email + " created.");
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Could not create user, Internal Server Error" });
    if (debug) console.log(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const body = await usersDb.list({ include_docs: true });
    // Extracting the actual documents from the response
    const users = body.rows.map((row) => {
      const { password, ...userWithoutPassword } = row.doc;
      return userWithoutPassword;
    });
    res.status(200).json(users);
    if (debug) console.log("sent users to client");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await usersDb.get(id);
    const result = await usersDb.destroy(user._id, user._rev);
    res.status(200).json(result);
    if (debug) console.log("deleted user");
  } catch (error) {
    if (debug) console.log("Could not delete user");
    res.status(500).json({ error: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await usersDb.get(id);
    // Remove the password field from the user document
    delete user.password;
    res.status(200).json(user);
    if (debug) console.log("sent user to client");
  } catch (error) {
    res.status(500).json({ msg: "Could not get, Internal Server Error", error: error.message });
  }
}

const patchUser = async (req, res) => {

  const data = req.body;
  const id = req.params.id;

  try {
    const user = await usersDb.get(id);
    const updatedUser = {...user, ...data};
    const result = await usersDb.insert(updatedUser);
    // return the full updated user
    const fullUpdatedUser = await usersDb.get(result.id);
    res.status(200).json(fullUpdatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = { signupUser, loginUser, patchUser, getUsers, getUser, deleteUser };
