'use strict';
module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define('car', {
  
    brand: {
      type: Sequelize.STRING,
      allowNull: false
    },

    model: {
      type: Sequelize.STRING,
      allowNull: true
    },

    matricule: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    color: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    fuel: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    transmission: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },

  }, {});
  /*
  Car.associate = function(models) {
    Car.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
  };*/
 /* Car.associate = function(models) {
    Car.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    })
  };*/
  return Car;

};