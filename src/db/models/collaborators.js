'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborators = sequelize.define('Collaborators', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Collaborators.associate = function(models) {
    // associations can be defined here
  };
  return Collaborators;
};