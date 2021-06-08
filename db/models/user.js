'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Task, { 
      through: 'UsersTasks',
      foreignKey: 'userId',
      as: 'ToDo'
    })
  };
  return User;
};