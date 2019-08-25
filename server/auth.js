const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// We define a random secret here to use for signing JWTs
// You should NOT do this normally. You don't want to hard code
// secret values into your code.
let secret = "RANDOMSECRETCHANGETHIS";

// Instead, you should define the value in a file called ".env".
// Then call "source .env" to put this into the environment
// This file should have in it:
// export jwtSecret="RANDOMSECRETCHANGETHIS"
// We would read this secret with the lne below:

// let secret = process.env.jwtSecret;

if (secret === undefined) {
  console.log("You need to define a jwtSecret environment variable to continue.");
  mongoose.connection.close();
  process.exit();
}

// Generate a token
const generateToken = (data, expires) => {
  return jwt.sign(data, secret, {
    expiresIn: expires
  });
};

// Verify the token that a client gives us.
// This is setup as middleware, so it can be passed as an additional argument to Express after
// the URL in any route. This will restrict access to only those clients who possess a valid token.
const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) return res.status(403).send({
    message: "No token provided."
  });
  try {
    const decoded = jwt.verify(token, secret);
    // save user id
    req.user_id = decoded.id;
    req.token = token;
    next();

  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: "Failed to authenticate token."
    });
  }
}

const removeOldTokens = (tokens) => {
  return tokens.filter(token => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  });
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
  removeOldTokens: removeOldTokens,
};