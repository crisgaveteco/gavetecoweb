'use strict';
module.exports = (sequelize, DataTypes) => {
  var retenciones_tabla_gcias = sequelize.define('retenciones_tabla_gcias', {
    min: DataTypes.DOUBLE,
    max: DataTypes.DOUBLE,
    fijo: DataTypes.DOUBLE,
    porc: DataTypes.DOUBLE,
    exced: DataTypes.DOUBLE
  }, {});
  retenciones_tabla_gcias.associate = function(models) {
    // associations can be defined here
  };
  return retenciones_tabla_gcias;
};