'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('retenciones_tabla_gcias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      min: {
        type: Sequelize.DOUBLE
      },
      max: {
        type: Sequelize.DOUBLE
      },
      fijo: {
        type: Sequelize.DOUBLE
      },
      porc: {
        type: Sequelize.DOUBLE
      },
      exced: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('retenciones_tabla_gcias');
  }
};