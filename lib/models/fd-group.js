var mappings = require('../../mappings.json'); // TODO

var SR_TABLE_NAME = 'FD_GROUP';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['FdGrp_Cd']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['FdGrp_Desc']] = {
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
