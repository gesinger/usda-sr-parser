var mappings = require('../../config/mappings.json');

var SR_TABLE_NAME = 'NUTR_DEF';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['Nutr_No']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['Units']] = {
    type: DataTypes.STRING,
    allowNull: false
  };
  attributes[colMappings['Tagname']] = {
    type: DataTypes.STRING,
    allowNull: true,
  };
  attributes[colMappings['NutrDesc']] = {
    type: DataTypes.STRING,
    allowNull: false,
  };
  attributes[colMappings['Num_Dec']] = {
    type: DataTypes.STRING,
    allowNull: false,
  };
  attributes[colMappings['SR_Order']] = {
    type: DataTypes.INTEGER,
    allowNull: false,
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.hasMany(models[mappings.NUT_DATA.name], {
          foreignKey: colMappings['Nutr_No'],
        });
        sequelizeTable.hasMany(models[mappings.FOOTNOTE.name], {
          foreignKey: colMappings['Nutr_No'],
        });
        sequelizeTable.hasMany(models[mappings.DATA_SRC.name], {
          foreignKey: colMappings['DataSrc_ID'],
          through: models[mappings.DATSRCLN.name]
        });
      }
    }
  });

  return sequelizeTable;
};
