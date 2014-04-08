var mappings = require('../../config/mappings.json');

var SR_TABLE_NAME = 'LANGDESC';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['Factor_Code']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['Description']] = {
    type: DataTypes.STRING,
    allowNull: false
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    classMethods: {
      associate: function(models) {}
    }
  });

  return sequelizeTable;
};
