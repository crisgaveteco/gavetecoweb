'use strict';
module.exports = (sequelize, DataTypes) => {
  var retenciones_arba = sequelize.define('retenciones_arba', {
    nroRet: DataTypes.INTEGER,
    prov: DataTypes.STRING,
    cuit: DataTypes.STRING,
    iibbn: DataTypes.STRING,
    nrosFc: DataTypes.STRING,
    fechaFc: DataTypes.STRING,
    concepto: DataTypes.STRING,
    baseImponible: DataTypes.DOUBLE,
    importe: DataTypes.DOUBLE,
    alic: DataTypes.STRING,
    coef: DataTypes.STRING,
    ret_fecha: DataTypes.DATE,
    emitida: DataTypes.BOOLEAN,
    anulada: DataTypes.BOOLEAN,
    pago: DataTypes.INTEGER
  }, {});
  retenciones_arba.associate = function(models) {
    // associations can be defined here
    
  };
  return retenciones_arba;
};