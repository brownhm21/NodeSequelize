const express = require("express");
const cors = require("cors");
const colors = require("colors");
const bodyParser = require('body-parser');


const app = express();

var corsOptions = {
  //origin: "*"
  allowedHeaders: ['Content-Type'],
  origin: '*',
  preflightContinue: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.send(200);
  } else {
      return next();
  }
}); 

const db = require("./models/index");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  //static Images Folder
app.use('/uploads/companies-images', express.static('./uploads/companies-images'));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Browny Backend." });
});
// routers
/*
const router = require('./routes/companyRoutes.js')
app.use('/api/companies', router)*/
require("./routes/companyRoutes")(app);
require("./routes/carsRoutes")(app);
require("./routes/adminRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`.yellow.bold);
});
