'use strict';
module.exports = (sequelize, DataTypes) => {
  var retenciones_iva = sequelize.define('retenciones_iva', {
    nroRet: DataTypes.INTEGER,
    prov: DataTypes.STRING,
    fac: DataTypes.INTEGER,
    nroFactura: DataTypes.STRING,
    fechaFac: DataTypes.STRING,
    concepto: DataTypes.STRING,
    netoFc: DataTypes.DOUBLE,
    ivaFc: DataTypes.DOUBLE,
    porc_ret: DataTypes.DOUBLE,
    ret_importe: DataTypes.DOUBLE,
    regimen: DataTypes.STRING,
    ret_fecha: DataTypes.DATE,
    emitida: DataTypes.BOOLEAN,
    anulada: DataTypes.BOOLEAN,
    pago: DataTypes.INTEGER
  }, {});
  retenciones_iva.associate = function(models) {
    // associations can be defined here
    
  };
  return retenciones_iva;
};