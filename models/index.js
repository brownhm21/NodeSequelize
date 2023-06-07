const dbConfig = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.companies = require("./companyModel")(sequelize, Sequelize);
db.cars = require("./carsModel")(sequelize, Sequelize);
db.admins = require("./adminModel")(sequelize, Sequelize);

// 1 to Many Relation
/*
db.companies.hasMany(db.cars, {
  foreignKey: 'carsid',
  as: 'car'
})
*/
/*
db.cars.belongsTo(db.companies, {
  foreignKey: 'carsid',
  as: 'car'
})

*/

//db.companies.hasMany(db.cars, {as : 'cars', foreignKey : 'companiesid'});
db.companies.hasMany(db.cars, {
  foreignKey : 'companyId',
  as : 'cars',
});
db.cars.belongsTo(db.companies, {
  foreignKey : 'companyId',
  as : 'company',
});




db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db;
