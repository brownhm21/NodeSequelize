const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveAdmin = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const username = await Admin.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.json(409).send("username already taken");
    }

    //checking if email already exist
    const emailcheck = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.json(409).send("Authentication failed");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const admin = await Admin.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (admin) {
      let token = jwt.sign({ id: admin.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("admin", JSON.stringify(admin, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(admin);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const existingUser = await Admin.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create the user with the hashed password
    const user = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = generateToken(user.id);

    res
      .status(201)
      .json({ message: "User created successfully!", user, token });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = generateToken(user.id);

    res.status(200).json({ message: "Login successful!", user, token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error });
  }
}

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const admin = await Admin.findOne({
      where: {
        email: email,
      },
    });

    //if user email is found, compare password with bcrypt
    if (admin) {
      const isSame = await bcrypt.compare(password, admin.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: admin.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(admin, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send(admin);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveAdmin,
  signup,
  login,
  createUser,
  loginUser,
};
