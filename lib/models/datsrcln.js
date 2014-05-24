var mappings = require('../config').getMappings();

var SR_TABLE_NAME = 'DATSRCLN';

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
  attributes[colMappings['Nutr_No']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: mappings['NUTR_DEF'].name,
    referencesKey: mappings['NUTR_DEF'].columns['Nutr_No']
  };
  attributes[colMappings['DataSrc_ID']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: mappings['DATA_SRC'].name,
    referencesKey: mappings['DATA_SRC'].columns['DataSrc_ID']
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        //sequelizeTable.belongsTo(models[mappings.FOOD_DES.name], {
        //  foreignKey: colMappings['NDB_No']
        //});
        //sequelizeTable.belongsTo(models[mappings.NUTR_DEF.name], {
        //  foreignKey: colMappings['Nutr_No']
        //});
        sequelizeTable.belongsTo(models[mappings.DATA_SRC.name], {
          foreignKey: colMappings['DataSrc_ID']
        });
      }
    }
  });

  return sequelizeTable;
};
