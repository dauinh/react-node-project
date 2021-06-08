'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    item: DataTypes.TEXT
  }, {});
  Task.associate = function(models) {
    Task.belongsToMany(models.User, {
      through: 'UsersTasks',
      foreignKey: 'taskId',
      as: 'Author'
    })
  };
  return Task;
};