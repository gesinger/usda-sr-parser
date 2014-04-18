var mappings = require('../../config/mappings.json'); // TODO

var SR_TABLE_NAME = 'FOOD_DES';

var tableMappings = mappings[SR_TABLE_NAME];
var mappedTableName = tableMappings.name;
var colMappings = tableMappings.columns;

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  attributes[colMappings['NDB_No']] = {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  };
  attributes[colMappings['FdGrp_Cd']] = {
    type: DataTypes.STRING,
    allowNull: false,
    references: mappings['FD_GROUP'].name,
    referencesKey: mappings['FD_GROUP'].columns['FdGrp_Cd']
  };
  attributes[colMappings['Long_Desc']] = {
    type: DataTypes.STRING,
    allowNull: false
  };
  attributes[colMappings['Shrt_Desc']] = {
    type: DataTypes.STRING,
    allowNull: false
  };
  attributes[colMappings['ComName']] = {
    type: DataTypes.STRING,
    allowNull: true 
  };
  attributes[colMappings['ManufacName']] = {
    type: DataTypes.STRING,
    allowNull: true 
  };
  attributes[colMappings['Survey']] = {
    type: DataTypes.BOOLEAN,
    allowNull: true 
  };
  attributes[colMappings['Ref_desc']] = {
    type: DataTypes.STRING,
    allowNull: true 
  };
  attributes[colMappings['Refuse']] = {
    type: DataTypes.INTEGER,
    allowNull: true 
  };
  attributes[colMappings['SciName']] = {
    type: DataTypes.STRING,
    allowNull: true 
  };
  attributes[colMappings['N_Factor']] = {
    type: DataTypes.DECIMAL,
    allowNull: true 
  };
  attributes[colMappings['Pro_Factor']] = {
    type: DataTypes.DECIMAL,
    allowNull: true 
  };
  attributes[colMappings['Fat_Factor']] = {
    type: DataTypes.DECIMAL,
    allowNull: true 
  };
  attributes[colMappings['CHO_Factor']] = {
    type: DataTypes.DECIMAL,
    allowNull: true 
  };

  var sequelizeTable = sequelize.define(mappedTableName, attributes, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        sequelizeTable.hasOne(models[mappings.FD_GROUP.name], {
          //as: colMappings['FdGrp_Cd'],
          foreignKey: colMappings['FdGrp_Cd']
        })
      }
    }
  });

  return sequelizeTable;
};
