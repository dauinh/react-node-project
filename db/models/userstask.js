'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UsersTasks = sequelize.define('UsersTasks', {
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {});
  UsersTasks.associate = function(models) {
    UsersTasks.belongsTo(models.User, { foreignKey: 'userId' })
    UsersTasks.belongsTo(models.Task, { foreignKey: 'taskId' })
  };
  return UsersTasks;
};