const db = require("../models");
const Company = db.companies;
const Op = db.Sequelize.Op;

// image Upload
const multer = require('multer');
const path = require('path');

// Create and Save a new Company
const create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Company
  const company = {
    name: req.body.name,
    ice: req.body.ice,
    logo: req.file.path,
    //logo: req.body.logo,
    adress: req.body.adress,
    phone: req.body.phone,
    email: req.body.email,
  };

  // Save Company in the database
 await Company.create(company)
    .then(data => {
     
      res.status(200).send(data);

    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Company."
      });
    });
};
// 2. get all companies

const getAllCompanies = async (req, res) => {

  let companies = await Company.findAll({
    include: ["cars"],
  })
  res.status(200).send(companies)

}
// Retrieve all Companies from the database
const findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { title: { [Op.iLike]: `%${name}%` } } : null;

  Company.findAll({ where: condition ,include: ["cars"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving companies."
      });
    });
};

// Find a single Company with an id
const findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id ,{ include: ["cars"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Company with id=" + id
      });
    });
};

// Update a Company by the id in the request
const update = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Company with id=" + id
      });
    });
};

// Delete a Company with the specified id in the request
const remove = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id
      });
    });
};

// Delete all Companies from the database
const removeAll = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Companies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Companies."
      });
    });
};
// 8. Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/companies-images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('logo')

module.exports = {
  create: create,
  findAll: findAll,
  getAllCompanies: getAllCompanies,
  findOne: findOne,
  update: update,
  delete: remove,
  deleteAll: removeAll,
  upload
};
  
 