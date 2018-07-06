'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('retenciones_ivas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nroRet: {
        type: Sequelize.STRING
      },
      prov: {
        type: Sequelize.INTEGER
      },
      fac: {
        type: Sequelize.INTEGER
      },
      concepto: {
        type: Sequelize.STRING
      },
      porc_ret: {
        type: Sequelize.DOUBLE
      },
      ret_importe: {
        type: Sequelize.DOUBLE
      },
      ret_fecha: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('retenciones_ivas');
  }
};