
module.exports  = app => {
  const cars = require("../controllers/carsController.js");

  var router = require("express").Router();


  // Create a new Companies
  router.post("/create" ,cars.create);

  // Retrieve all cars
  router.get("/", cars.findAll);
  // Retrieve all cars
  router.get("/getAllCars", cars.getAllCars);

  // Retrieve a single Cars with id
  router.get("/:id", cars.findOne);

  // Update a Cars with id
  router.put("/:id", cars.update);

  // Delete a Cars with id
  router.delete("/:id", cars.delete);

  // Delete all cars
  router.delete("/", cars.deleteAll);

  app.use("/api/cars", router);
};

