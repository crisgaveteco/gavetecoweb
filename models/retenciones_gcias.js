'use strict';
module.exports = (sequelize, DataTypes) => {
  var retenciones_gcias = sequelize.define('retenciones_gcias', {
    nroRet: DataTypes.INTEGER,
    prov: DataTypes.STRING,
    facs: DataTypes.STRING,
    fechaFac: DataTypes.DATE,
    concepto: DataTypes.STRING,
    bruto_ant: DataTypes.DOUBLE,
    deduc_ant: DataTypes.DOUBLE,
    neto_ant: DataTypes.DOUBLE,
    bruto: DataTypes.DOUBLE,
    deduc: DataTypes.DOUBLE,
    neto: DataTypes.DOUBLE,
    minimo: DataTypes.DOUBLE,
    fijo: DataTypes.DOUBLE,
    retencion: DataTypes.DOUBLE,
    ret_ant: DataTypes.DOUBLE,
    regimen: DataTypes.STRING,
    ret_fecha: DataTypes.DATE
  }, {});
  retenciones_gcias.associate = function(models) {
    // associations can be defined here
    
  };
  return retenciones_gcias;
};