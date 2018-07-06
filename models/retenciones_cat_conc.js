'use strict';
module.exports = (sequelize, DataTypes) => {
  var retenciones_cat_conc = sequelize.define('retenciones_cat_conc', {
    name: DataTypes.STRING,
    gcias_minimo: DataTypes.DOUBLE,
    gcias_fijo: DataTypes.DOUBLE,
    iva_imp_lim: DataTypes.DOUBLE,
    porc_h_lim: DataTypes.DOUBLE,
    porc_desp_lim: DataTypes.DOUBLE
  }, {});
  retenciones_cat_conc.associate = function(models) {
    // associations can be defined here
  };
  return retenciones_cat_conc;
};