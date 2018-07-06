'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('retenciones_gcias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nroRet: {
        type: Sequelize.INTEGER
      },
      prov: {
        type: Sequelize.STRING
      },
      facs: {
        type: Sequelize.STRING
      },
      concepto: {
        type: Sequelize.STRING
      },
      bruto_ant: {
        type: Sequelize.DOUBLE
      },
      deduc_ant: {
        type: Sequelize.DOUBLE
      },
      neto_ant: {
        type: Sequelize.DOUBLE
      },
      bruto: {
        type: Sequelize.DOUBLE
      },
      deduc: {
        type: Sequelize.DOUBLE
      },
      neto: {
        type: Sequelize.DOUBLE
      },
      minimo: {
        type: Sequelize.DOUBLE
      },
      fijo: {
        type: Sequelize.DOUBLE
      },
      retencion: {
        type: Sequelize.DOUBLE
      },
      ret_ant: {
        type: Sequelize.DOUBLE
      },
      ret_fecha: {
        type: Sequelize.DATE
      },
      regimen: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('retenciones_gcias');
  }
};