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

  res.status(200).json({ email, token });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
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

    res.status(200).json({ email, token });
    if (debug) console.log("User with email: " + email + " created.");
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Could not create user, Internal Server Error" });
    if (debug) console.log(err);
  }
};

module.exports = { signupUser, loginUser };
