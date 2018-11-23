'use strict';
module.exports = (sequelize, DataTypes) => {
  var compro = sequelize.define('compro', {
    nroInterno: {
        type: DataTypes.STRING,
        primaryKey: true},
    FDC: DataTypes.STRING,
    nroCompro: DataTypes.STRING,
    fecha: DataTypes.DATE,
    proveedor: DataTypes.STRING,
    letraABC: DataTypes.STRING,
    bruto21: DataTypes.DOUBLE,
    iva21: DataTypes.DOUBLE,
    bruto1050: DataTypes.DOUBLE,
    iva1050: DataTypes.DOUBLE,
    bruto27: DataTypes.DOUBLE,
    iva27: DataTypes.DOUBLE,
    retIVA: DataTypes.DOUBLE,
    percIVA: DataTypes.DOUBLE,
    retIB: DataTypes.DOUBLE,
    percIB: DataTypes.DOUBLE,
    retGan: DataTypes.DOUBLE,
    percGan: DataTypes.DOUBLE,
    noGravado: DataTypes.DOUBLE,
    monotributo: DataTypes.DOUBLE,
    exento: DataTypes.DOUBLE,
    iInterno: DataTypes.DOUBLE,
    iMunicipales: DataTypes.DOUBLE,
    iNacionales: DataTypes.DOUBLE,
    fRegCont: DataTypes.DATE,
    contado: DataTypes.STRING,
    ctaacred: DataTypes.STRING,
    ctap2: DataTypes.STRING,
    ctap3: DataTypes.STRING,
    ctap4: DataTypes.STRING,
    imp1: DataTypes.DOUBLE,
    imp2: DataTypes.DOUBLE,
    imp3: DataTypes.DOUBLE,
    imp4: DataTypes.DOUBLE,
    observ: DataTypes.STRING,
    obs2: DataTypes.STRING,
    cotiza: DataTypes.DOUBLE,
    tico: DataTypes.STRING,
    cai: DataTypes.STRING,
    vtoCAI: DataTypes.DATE,
    contr: DataTypes.STRING,
    aduana: DataTypes.STRING,
    destino: DataTypes.STRING,
    despacho: DataTypes.STRING,
    letraDesp: DataTypes.STRING,
    cc: DataTypes.STRING,
    cuentaBco: DataTypes.STRING,
    total: DataTypes.DOUBLE,
    fechaAMD: DataTypes.STRING
  }, {});
  compro.associate = function(models) {
    // associations can be defined here
    
  };
  return compro;
};
