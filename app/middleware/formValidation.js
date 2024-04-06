const fs = require("node:fs");

const userFormValidation = (req, res, next) => {
  const { uname, email, password, image_upload } = req.body;

  if ((uname == "" || email == "" || password == "") && req.file != undefined) {
    fs.unlinkSync("./public/images/" + req.file.filename); //deleting uploaded image if other information is not submitted
  }

  if (uname == "") {
    res.send({
      error: {
        uname: "Please, enter username!",
      },
    });
  } else if (email == "") {
    res.send({
      error: {
        email: "Please, enter email!",
      },
    });
  } else if (!emailValidation(email)) {
    res.send({
      error: {
        validEmail: "You have entered invalid email!",
      },
    });
  } else if (password == "") {
    res.send({
      error: {
        password: "Please, enter a password!",
      },
    });
  } else if (password.length < 4) {
    res.send({
      error: {
        passwordLength: "Password length must be at least 4!",
      },
    });
  } else if (!req.file) {
    res.send({
      error: {
        image: "Please, upload image!",
      },
    });
  } else if ((uname != "", email != "", password != "")) {
    next();
  }
};

const emailValidation = (email) => {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(email);
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (email == "") {
    return res.send({
      error: "Please enter your email!",
    });
  } else if (!emailValidation(email)) {
    return res.send({
      error: {
        validEmail: "You have entered invalid email!",
      },
    });
  } else if (password == "") {
    return res.send({
      error: "Please enter your password!",
    });
  } else {
    next();
  }
};

const postValidation = (req, res, next) => {
  const { title, description, post_image } = req.body;

  if ((title == "" || description == "") && req.file != undefined) {
    fs.unlinkSync("./public/images/" + req.file.filename); //deleting uploaded image if other information is not submitted
  }

  if (!title) {
    return res.send({
      error: "Please enter a title!",
    });
  } else if (!description) {
    return res.send({
      error: "Please enter post description!",
    });
  } else if (!req.file) {
    return res.send({
      error: {
        image: "Please, upload image!",
      },
    });
  } else {
    next();
  }
};

module.exports = { userFormValidation, loginValidation, postValidation };
