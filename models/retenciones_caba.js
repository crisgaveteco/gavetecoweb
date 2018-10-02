'use strict';
module.exports = (sequelize, DataTypes) => {
  var retenciones_caba = sequelize.define('retenciones_caba', {
    nroRet: DataTypes.INTEGER,
    prov: DataTypes.STRING,
    cuit: DataTypes.STRING,
    iibbn: DataTypes.STRING,
    fac: DataTypes.INTEGER,
    nroFactura: DataTypes.STRING,
    fechaFac: DataTypes.STRING,
    concepto: DataTypes.STRING,
    netoFc: DataTypes.DOUBLE,
    ivaFc: DataTypes.DOUBLE,
    totalFc: DataTypes.DOUBLE,
    ret_importe: DataTypes.DOUBLE,
    cat: DataTypes.STRING,
    alic: DataTypes.STRING,
    tipoRet: DataTypes.STRING,
    ret_fecha: DataTypes.DATE,
    emitida: DataTypes.BOOLEAN,
    anulada: DataTypes.BOOLEAN,
    pago: DataTypes.INTEGER
  }, {});
  retenciones_caba.associate = function(models) {
    // associations can be defined here
    
  };
  return retenciones_caba;
};