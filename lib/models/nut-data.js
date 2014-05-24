var mappings = require('../config').getMappings();

var SR_TABLE_NAME = 'NUT_DATA';

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
  attributes[colMappings['Nutr_Val']] = {
    type: DataTypes.DECIMAL,
    allowNull: false,
  };
  attributes[colMappings['Num_Data_Pts']] = {
    type: DataTypes.INTEGER,
    allowNull: false,
  };
  attributes[colMappings['Std_Error']] = {
    type: DataTypes.DECIMAL,
    allowNull: true,
  };
  attributes[colMappings['Src_Cd']] = {
    type: DataTypes.STRING,
    allowNull: false,
    references: mappings['SRC_CD'].name,
    referencesKey: mappings['SRC_CD'].columns['Src_Cd']
  };
  attributes[colMappings['Deriv_Cd']] = {
    type: DataTypes.STRING,
    allowNull: true,
    references: mappings['DERIV_CD'].name,
    referencesKey: mappings['DERIV_CD'].columns['Deriv_Cd']
  };
  attributes[colMappings['Ref_NDB_No']] = {
    type: DataTypes.STRING,
    allowNull: true,
    references: mappings['FOOD_DES'].name,
    referencesKey: mappings['FOOD_DES'].columns['NDB_No']
  };
  attributes[colMappings['Add_Nutr_Mark']] = {
    type: DataTypes.BOOLEAN, // TODO
    allowNull: true,
  };
  attributes[colMappings['Num_Studies']] = {
    type: DataTypes.INTEGER,
    allowNull: true,
  };
  attributes[colMappings['Min']] = {
    type: DataTypes.DECIMAL,
    allowNull: true,
  };
  attributes[colMappings['Max']] = {
    type: DataTypes.DECIMAL,
    allowNull: true,
  };
  attributes[colMappings['DF']] = {
    type: DataTypes.INTEGER,
    allowNull: true,
  };
  attributes[colMappings['Low_EB']] = {
    type: DataTypes.DECIMAL,
    allowNull: true,
  };
  attributes[colMappings['Up_EB']] = {
    type: DataTypes.DECIMAL,
    allowNull: true,
  };
  attributes[colMappings['Stat_cmt']] = {
    type: DataTypes.STRING,
    allowNull: true,
  };
  attributes[colMappings['AddMod_Date']] = {
    type: DataTypes.STRING,
    allowNull: true,
  };
  attributes[colMappings['CC']] = {
    type: DataTypes.STRING,
    allowNull: true,
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
        sequelizeTable.belongsTo(models[mappings.SRC_CD.name], {
          foreignKey: colMappings['Src_Cd']
        });
        sequelizeTable.belongsTo(models[mappings.DERIV_CD.name], {
          foreignKey: colMappings['Deriv_Cd']
        });
        // TODO Ref_NDB_No
        //sequelizeTable.belongsTo(models[mappings.FOOD_DES.name], {
        //  foreignKey: colMappings['Deriv_Cd']
        //});
      }
    }
  });

  return sequelizeTable;
};
