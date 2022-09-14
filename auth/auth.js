const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const User = require("../models/user-model");

const isEmpty = require("../utils/is-empty");

exports.ensureAuthenticated = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      errors: ["Please make sure your request has an 'Authorization' header"],
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          errors: ["Session timed out, please login again"],
        });
      } else {
        return res.status(400).json({
          success: false,
          errors: [
            "It seems like the token is not valid, please try signing in again",
          ],
        });
      }
    }

    User.findById(decoded.user._id)
      .then((foundUser) => {
        if (!foundUser) {
          return res
            .status(404)
            .json({ success: false, errors: ["User not found"] });
        }

        // if (foundUser.role !== "admin" && foundUser.role !== "sub-admin") {
        //   return res.status(403).json({
        //     success: false,
        //     errors: ["Only admins or sub-admins can access this"],
        //   });
        // }

        req.user = foundUser;

        next();
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ success: false, errors: ["Something went wrong"] });
      });
  });
};

exports.isLoggedIn = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (isEmpty(authHeader)) {
    next();
  } else {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({
            success: false,
            errors: ["Session timed out, please login again"],
          });
        } else {
          return res.status(400).json({
            success: false,
            errors: [
              "It seems like the token is not valid, please try signing in again",
            ],
          });
        }
      } else {
        User.findById(decoded.user._id)
          .then((foundUser) => {
            if (!foundUser) {
              return res
                .status(404)
                .json({ success: false, errors: ["User not found"] });
            }

            req.user = foundUser;

            next();
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({ success: false, errors: ["Something went wrong"] });
          });
      }
    });
  }
};

exports.createToken = (payload) => {
  return jwt.sign(payload, secret);
  // return jwt.sign(payload, secret, { expiresIn: "1d" });
};
