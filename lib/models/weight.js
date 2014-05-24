var mappings = require('../config').getMappings();

var SR_TABLE_NAME = 'WEIGHT';

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
  attributes[colMappings['Seq']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['Amount']] = {
    type: DataTypes.DECIMAL,
    allowNull: false
  };
  attributes[colMappings['Msre_Desc']] = {
    type: DataTypes.STRING,
    allowNull: false
  };
  attributes[colMappings['Gm_Wgt']] = {
    type: DataTypes.DECIMAL,
    allowNull: false
  };
  attributes[colMappings['Num_Data_Pts']] = {
    type: DataTypes.INTEGER,
    allowNull: true
  };
  attributes[colMappings['Std_Dev']] = {
    type: DataTypes.DECIMAL,
    allowNull: true
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.belongsTo(models[mappings.FOOD_DES.name], {
          foreignKey: colMappings['NDB_No']
        });
      }
    }
  });

  return sequelizeTable;
};
