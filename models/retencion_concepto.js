'use strict';
module.exports = (sequelize, DataTypes) => {
  var retencion_concepto = sequelize.define('retencion_concepto', {
    nombre: DataTypes.STRING,
    categoria: DataTypes.INTEGER
  }, {});
  retencion_concepto.associate = function(models) {
    // associations can be defined here
    //retencion_concepto.belongsTo(Retenciones_cat_conc,{foreingKey:"id",targetKey:"categoria"});
  };
  return retencion_concepto;
};