const db = require("../models");
const Car = db.cars;
const Op = db.Sequelize.Op;

// Create and Save a new Company
const create = async (req, res) => {
  // Validate request
/*
  if (!req.body.brand) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }*/
 
  //console.log(req)

  // Create a Company
  const car = {
    brand: req.body.brand,
    model: req.body.model,
    matricule: req.body.matricule,
    color: req.body.color,
    fuel: req.body.fuel,
    transmission: req.body.transmission,
    price: req.body.price,
    companyId:req.body.companyId,
   


  };

  // Save Company in the database
 await Car.create(car)
    .then(data => {
     
      res.status(200).send(data);

    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Company."
      });
    });
};
// 2. get all products

const getAllCars = async (req, res) => {

  let cars = await Car.findAll({})
  res.status(200).send(cars)

}
// Retrieve all Cars from the database
const findAll = (req, res) => {
  const brand = req.query.brand;
  const condition = brand ? { title: { [Op.iLike]: `%${brand}%` } } : null;

  Car.findAll({ where: condition, include: ["company"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars."
      });
    });
};

// Find a single Car with an id
const findOne = (req, res) => {
  const id = req.params.id;

  Car.findByPk(id ,{ include: ["company"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id
      });
    });
};

// Update a Car by the id in the request
const update = (req, res) => {
  const id = req.params.id;

  Car.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Car was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Car with id=" + id
      });
    });
};

// Delete a Car with the specified id in the request
const remove = (req, res) => {
  const id = req.params.id;

  Car.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Car was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id
      });
    });
};

// Delete all Cars from the database
const removeAll = (req, res) => {
  Car.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cars were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Cars."
      });
    });
};


module.exports = {
  create: create,
  findAll: findAll,
  getAllCars: getAllCars,
  findOne: findOne,
  update: update,
  delete: remove,
  deleteAll: removeAll,

};
  
 