'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UsersTasks = sequelize.define('UsersTasks', {
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {});
  UsersTasks.associate = function(models) {
    UsersTasks.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
    UsersTasks.belongsTo(models.Task, {
      foreignKey: {
        name: 'taskId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
  };
  return UsersTasks;
};