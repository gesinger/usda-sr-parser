var mappings = require('../../config/mappings.json');

var SR_TABLE_NAME = 'DERIV_CD';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['Derv_Cd']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['Deriv_Desc']] = {
    type: DataTypes.STRING,
    allowNull: false
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.hasMany(models[mappings.NUT_DATA.name], {
          foreignKey: colMappings['Deriv_Cd'],
        });
      }
    }
  });

  return sequelizeTable;
};
