/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('note-tag', {
      note_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('note-tag');
  }
};
