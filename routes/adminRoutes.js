module.exports  = app => {
    const admins = require("../controllers/adminController.js");
    const { verifyToken } = require('../utils/generateToken');
  
    var router = require("express").Router();

  
    // Create a new admins
    router.post("/signup",admins.signup ,admins.saveAdmin);
    //login route

    router.post('/login',admins.login );

    // Create a new admins
    router.post("/signup1",admins.createUser);
    //login route

    router.post('/login1',admins.loginUser );
  
    app.use("/api/admins", router);
  };