const{ Sequelize, DataTypes } = require('sequelize');

const Character = {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  race: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  bio: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  faction: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  str: {
    allowNull: true,
    type: DataTypes.INTEGER,
    validate: {
      max: 20,
    }
  },
  dex: {
    allowNull: true,
    type: DataTypes.INTEGER,
    validate: {
      max: 20,
    }
  },
  int: {
    allowNull: true,
    type: DataTypes.INTEGER,
    validate: {
      max: 20,
    }
  },
  chr: {
    allowNull: true,
    type: DataTypes.INTEGER,
    validate: {
      max: 20,
    }
  },
  con: {
    allowNull: true,
    type: DataTypes.INTEGER,
    validate: {
      max: 20,
    }
  },
  wis: {
    allowNull: true,
    type: DataTypes.INTEGER,
    validate: {
      max: 20,
    }
  },
}

module.exports = Character;
