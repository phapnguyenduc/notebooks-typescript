/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'tags',
      [
        {
          name: 'Work',
        },
        {
          name: 'School',
        },
        {
          name: 'Personal Information',
        },
        {
          name: 'Inportant Information',
        },
        {
          name: 'Others',
        },
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
