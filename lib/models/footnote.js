/*
 * As per the description in SR26, the FOOTNOTE DB cannot be indexed, and does
 * not have any primary keys.
 */

var mappings = require('../config').getMappings();

var SR_TABLE_NAME = 'FOOTNOTE';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['NDB_No']] = {
    type: DataTypes.STRING,
    allowNull: false,
    references: mappings['FOOD_DES'].name,
    referencesKey: mappings['FOOD_DES'].columns['NDB_No']
  };
  attributes[colMappings['Footnt_No']] = {
    type: DataTypes.STRING,
    allowNull: false,
  };
  attributes[colMappings['Footnt_Type']] = {
    type: DataTypes.STRING,
    allowNull: false
  };
  attributes[colMappings['Nutr_No']] = {
    type: DataTypes.STRING,
    allowNull: true,
    references: mappings['NUTR_DEF'].name,
    referencesKey: mappings['NUTR_DEF'].columns['Nutr_No']
  };
  attributes[colMappings['Footnt_Txt']] = {
    type: DataTypes.STRING,
    allowNull: false
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.belongsTo(models[mappings.FOOD_DES.name], {
          foreignKey: colMappings['NDB_No']
        });
        sequelizeTable.belongsTo(models[mappings.NUTR_DEF.name], {
          foreignKey: colMappings['Nutr_No']
        });
      }
    }
  });

  return sequelizeTable;
};
