
module.exports  = app => {
    const companies = require("../controllers/companyController.js");
  
    var router = require("express").Router();

  
    // Create a new Companies
    router.post("/create",companies.upload ,companies.create);
  
    // Retrieve all companies
    router.get("/", companies.findAll);
    // Retrieve all companies
    router.get("/getAllCompanies", companies.getAllCompanies);
  
    // Retrieve a single Companies with id
    router.get("/:id", companies.findOne);
  
    // Update a Companies with id
    router.put("/:id", companies.update);
  
    // Delete a Companies with id
    router.delete("/:id", companies.delete);
  
    // Delete all companies
    router.delete("/", companies.deleteAll);
  
    app.use("/api/companies", router);
  };
 
