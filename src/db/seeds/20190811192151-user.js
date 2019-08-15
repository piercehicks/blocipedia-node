'use strict';
const faker = require("faker");

let users = [
   {
    username: "blue",
    email: "blue1@gmail.com",
    password: "bluebird",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "member"
   },
   {
    username: "yellow",
    email: "yellow2@outlook.com",
    password: "yellowbird",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "member"
   },
   {
    username: "green",
    email: "green3@gmail.com",
    password: "greenbird",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "member"
   }
 ];

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", users, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users",null, {});

  }
};
