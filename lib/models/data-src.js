var mappings = require('../../config/mappings.json');

var SR_TABLE_NAME = 'DATA_SRC';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['DataSrc_ID']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['Authors']] = {
    type: DataTypes.STRING,
    allowNull: true
  };
  attributes[colMappings['Title']] = {
    type: DataTypes.STRING,
    allowNull: false
  };
  attributes[colMappings['Year']] = {
    type: DataTypes.STRING,
    allowNull: true
  };
  attributes[colMappings['Journal']] = {
    type: DataTypes.STRING,
    allowNull: true
  };
  attributes[colMappings['Vol_City']] = {
    type: DataTypes.STRING,
    allowNull: true
  };
  attributes[colMappings['Issue_State']] = {
    type: DataTypes.STRING,
    allowNull: true
  };
  attributes[colMappings['Start_Page']] = {
    type: DataTypes.STRING,
    allowNull: true
  };
  attributes[colMappings['End_Page']] = {
    type: DataTypes.STRING,
    allowNull: true
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.hasMany(models[mappings.FOOD_DES.name], {
          foreignKey: colMappings['DataSrc_ID'],
          through: models[mappings.DATSRCLN.name]
        });
      }
    }
  });

  return sequelizeTable;
};
