'use strict';
module.exports = (sequelize, DataTypes) => {
  var prov = sequelize.define('prov', {
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true},
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    cpostal: DataTypes.STRING,
    localidad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    telefono: DataTypes.STRING,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    ctaprov: DataTypes.STRING,
    cuit: DataTypes.STRING,
    condfis: DataTypes.STRING,
    retivasn: DataTypes.STRING,
    porretiva: DataTypes.STRING,
    retgansn: DataTypes.STRING,
    concepto: DataTypes.STRING,
    inscgansn: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    cta2: DataTypes.STRING,
    cta3: DataTypes.STRING,
    cta4: DataTypes.STRING,
    porc1: DataTypes.STRING,
    porc2: DataTypes.STRING,
    porc3: DataTypes.STRING,
    porc4: DataTypes.STRING,
    vtoco: DataTypes.STRING,
    nroInscrIB: DataTypes.STRING,
    VencRetIVA: DataTypes.STRING,
    VencRetGan: DataTypes.STRING,
    RetIBBASN: DataTypes.STRING,
    PrRetIBBA: DataTypes.STRING,
    RetPrevSN: DataTypes.STRING,
    PorRetPrev: DataTypes.STRING,
    VencRetPrev: DataTypes.STRING,
    RetPescaSN: DataTypes.STRING,
    InscPescaSN: DataTypes.STRING
  }, {});
  prov.associate = function(models) {
    // associations can be defined here
    
  };
  return prov;
};
