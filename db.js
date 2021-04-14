const { Sequelize } = require('sequelize');
const userModel = require('./models/user');
const characterModel = require('./models/character');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres'
});

try {
  sequelize.authenticate();
  console.log('database connected');

  const User = sequelize.define('User', userModel);
  const Character = sequelize.define('Character', characterModel);

  User.hasMany(Character, {
    foreignKey: {
      userId: 'userId',
      allowNull: false,
    }
  });


} catch (err) {
  console.log('unable to connect to database');
  console.log(err);
}




module.exports = sequelize;
