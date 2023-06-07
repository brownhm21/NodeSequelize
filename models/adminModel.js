module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('admin', {
    username: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
      type: Sequelize.STRING,
      unique: true,
      isEmail: true, //checks for email format
      allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false
  },

  }, {});
  




  return Admin;

};