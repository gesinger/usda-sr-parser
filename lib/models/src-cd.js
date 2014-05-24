var mappings = require('../config').getMappings();

var SR_TABLE_NAME = 'SRC_CD';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['Src_Cd']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['SrcCd_Desc']] = {
    type: DataTypes.STRING,
    allowNull: false
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.hasMany(models[mappings.NUT_DATA.name], {
          foreignKey: colMappings['Src_Cd'],
        });
      }
    }
  });

  return sequelizeTable;
};
