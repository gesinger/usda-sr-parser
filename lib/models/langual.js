var mappings = require('../../config/mappings.json');

var SR_TABLE_NAME = 'LANGUAL';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['NDB_No']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: mappings['FOOD_DES'].name,
    referencesKey: mappings['FOOD_DES'].columns['NDB_No']
  };
  attributes[colMappings['Factor_Code']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: mappings['LANGDESC'].name,
    referencesKey: mappings['LANGDESC'].columns['Factor_Code']
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.belongsTo(models[mappings.FOOD_DES.name], {
          foreignKey: colMappings['NDB_No']
        });
        sequelizeTable.belongsTo(models[mappings.LANGDESC.name], {
          foreignKey: colMappings['Factor_Code']
        });
      }
    }
  });

  return sequelizeTable;
};
