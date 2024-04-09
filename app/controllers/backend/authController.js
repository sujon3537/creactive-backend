const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const privateKey = process.env.PRIVATE_KEY;
const port = process.env.APP_PORT;
const frontendUrl = process.env.FRONTEND_URL;

const userModel = require("../../models/userModel.js");
const emailSender = require("../../utils/emailSender.js");

const auth = {
  register(req, res) {
    const { uname, email, password } = req.body;

    bcrypt.hash(password, saltRounds, function (err, hash) {
      let token = jwt.sign(email, privateKey, { algorithm: "HS256" });

      const user = new userModel({
        uname,
        email,
        password: hash,
        image: req.file.filename,
      });

      user.save();

      emailSender(email, token);

      res.send({
        success: "Registered successfully",
      });
    });
  },

  verifyEmail(req, res) {
    token = req.params.token;
    jwt.verify(token, privateKey, async function (err, decoded) {
      if (decoded) {
        res.redirect(`http://localhost:${port}/api/v1/backend/auth/loginpage`);

        const mailVarify = await userModel.findOneAndUpdate(
          { email: decoded },
          { $set: { emailVerified: true } },
          {
            new: true,
          }
        );
      } else {
        res.send({
          error: "invalid token",
        });
      }
    });
  },

  loginPage(req, res) {
    res.redirect(frontendUrl);
  },

  async login(req, res) {
    const { email, password } = req.body;

    const userInfo = await userModel.findOne({ email });
    // console.log("login hoitamna", userInfo);
    if (userInfo) {
      bcrypt.compare(password, userInfo.password, function (err, result) {
        console.log("res", result);
        if (result) {
          if (userInfo.emailVerified) {
            let userLoggedin = (Date.now() + 7 * 24 * 60 * 60) / 1000;

            res.send({
              success: "Login Successfull",
              data: {
                uname: userInfo.uname,
                email: userInfo.email,
                image: userInfo.image,
                userId: userInfo._id,
                userLoginTime: userLoggedin,
                login: true,
              },
            });
          } else {
            console.log("email verify kor");
          }
        } else {
          console.log("pass", err);
        }
      });
    } else {
      res.send({
        error: "Invalid credentials!",
      });
    }
  },
};

module.exports = auth;
