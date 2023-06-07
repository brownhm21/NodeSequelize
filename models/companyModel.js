module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('company', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ice: {
      type: Sequelize.STRING,
      allowNull: false
    },

    logo: {
      type: Sequelize.STRING,
      
    },

    adress: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    phone: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type:Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail: {msg: "It must be a valid Email address"},
      }
    }
  }, {});
  /*Company.associate = function(models) {
    Company.hasMany(models.Car, {
      foreignKey: 'companyId',
      as: 'cars'
    })
  };*/




  return Company;

};