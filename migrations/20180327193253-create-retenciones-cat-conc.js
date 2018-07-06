'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('retenciones_cat_concs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      gcias_minimo: {
        type: Sequelize.DOUBLE
      },
      gcias_fijo: {
        type: Sequelize.DOUBLE
      },
      iva_imp_lim: {
        type: Sequelize.DOUBLE
      },
      porc_h_lim: {
        type: Sequelize.DOUBLE
      },
      porc_desp_lim: {
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
    return queryInterface.dropTable('retenciones_cat_concs');
  }
};