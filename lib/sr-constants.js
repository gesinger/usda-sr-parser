function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}

define("FOOD_DESCRIPTION_TABLE", {
  name: 'FOOD_DES',
  fileName: 'FOOD_DES.txt',
  topLevelTable: true,
  columns: [
    {
      name: 'NDB_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
    },
    {
      name: 'FdGrp_Cd',
      type: 'text',
      canBeBlank: false,
      foreignKey: {
        table: 'FD_GROUP',
        colName: 'FdGrp_Cd'
      }
    },
    { name: 'Long_Desc',   type: 'text',    canBeBlank: false },
    { name: 'Shrt_Desc',   type: 'text',    canBeBlank: true  },
    { name: 'ComName',     type: 'text',    canBeBlank: true  },
    { name: 'ManufacName', type: 'text',    canBeBlank: true  },
    { name: 'Survey',      type: 'boolean', canBeBlank: true  },
    { name: 'Ref_desc',    type: 'text',    canBeBlank: true  },
    { name: 'Refuse',      type: 'integer', canBeBlank: true  },
    { name: 'SciName',     type: 'text',    canBeBlank: true  },
    { name: 'N_Factor',    type: 'real',    canBeBlank: true  },
    { name: 'Pro_Factor',  type: 'real',    canBeBlank: true  },
    { name: 'Fat_Factor',  type: 'real',    canBeBlank: true  },
    { name: 'CHO_Factor',  type: 'real',    canBeBlank: true  }
  ]
});

define("FOOD_GROUP_DESCRIPTION_TABLE", {
  name: 'FD_GROUP',
  fileName: 'FD_GROUP.txt',
  topLevelTable: false,
  columns: [
    {
      name: 'FdGrp_Cd',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
    },
    { name: 'FdGrp_Desc', type: 'text', canBeBlank: false }
  ]
});

define("LANGUAL_FACTOR_TABLE", {
  name: 'LANGUAL',
  fileName: 'LANGUAL.txt',
  topLevelTable: true,
  columns: [
    {
      name: 'NDB_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'FOOD_DES',
        colName: 'NDB_No'
      }
    },
    {
      name: 'Factor_Code',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'LANGDESC',
        colName: 'Factor_Code'
      }
    }
  ]
});

define("LANGUAL_FACTORS_DESCRIPTION_TABLE", {
  name: 'LANGDESC',
  fileName: 'LANGDESC.txt',
  topLevelTable: false,
  columns: [
    {
      name: 'Factor_Code',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
    },
    { name: 'Description', type: 'text', canBeBlank: false }
  ]
});

define("NUTRIENT_DATA_TABLE", {
  name: 'NUT_DATA',
  fileName: 'NUT_DATA.txt',
  topLevelTable: true,
  columns: [
    {
      name: 'NDB_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'FOOD_DES',
        colName: 'NDB_No'
      }
    },
    {
      name: 'Nutr_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'NUTR_DEF',
        colName: 'Nutr_No'
      }
    },
    { name: 'Nutr_Val',     type: 'real', canBeBlank: false },
    { name: 'Num_Data_Pts', type: 'real', canBeBlank: false },
    { name: 'Std_Error',    type: 'real', canBeBlank: true },
    {
      name: 'Src_Cd',
      type: 'text',
      canBeBlank: false,
      foreignKey: {
        table: 'SRC_CD',
        colName: 'Src_Cd'
      }
    },
    {
      name: 'Deriv_Cd',
      type: 'text',
      canBeBlank: true,
      foreignKey: {
        table: 'DERIV_CD',
        colName: 'Deriv_Cd'
      }
    },
    {
      name: 'Ref_NDB_No',
      type: 'text',
      canBeBlank: true,
      foreignKey: {
        table: 'FOOD_DES',
        colName: 'NDB_No'
      }
    },
    { name: 'Add_Nutr_Mark', type: 'boolean', canBeBlank: true },
    { name: 'Num_Studies',   type: 'integer', canBeBlank: true },
    { name: 'Min',           type: 'real',    canBeBlank: true },
    { name: 'Max',           type: 'real',    canBeBlank: true },
    { name: 'DF',            type: 'integer', canBeBlank: true },
    { name: 'Low_EB',        type: 'real',    canBeBlank: true },
    { name: 'Up_EB',         type: 'real',    canBeBlank: true },
    { name: 'Stat_cmt',      type: 'text',    canBeBlank: true },
    { name: 'AddMod_Date',   type: 'text',    canBeBlank: true },
    { name: 'CC',            type: 'text',    canBeBlank: true }
  ]
});

define("NUTRIENT_DEFINITION_TABLE", {
  name: 'NUTR_DEF',
  fileName: 'NUTR_DEF.txt',
  topLevelTable: false,
  columns: [
    {
      name: 'Nutr_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'NUTR_DEF',
        colName: 'Nutr_No'
      }
    },
    { name: 'Units',    type: 'text',    canBeBlank: false },
    { name: 'Tagname',  type: 'text',    canBeBlank: true },
    { name: 'NutrDesc', type: 'text',    canBeBlank: false },
    { name: 'Num_Dec',  type: 'text',    canBeBlank: false },
    { name: 'SR_Order', type: 'integer', canBeBlank: false }
  ]
});

define("SOURCE_CODE_TABLE", {
  name: 'SRC_CD',
  fileName: 'SRC_CD.txt',
  topLevelTable: false,
  columns: [
    {
      name: 'Src_Cd',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
    },
    { name: 'SrcCd_Desc', type: 'text', canBeBlank: false }
  ]
});

define("DATA_DERIVATION_CODE_TABLE", {
  name: 'DERIV_CD',
  fileName: 'DERIV_CD.txt',
  topLevelTable: false,
  columns: [
    {
      name: 'Deriv_Cd',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
    },
    { name: 'Deriv_Desc', type: 'text', canBeBlank: false }
  ]
});

define("WEIGHT_TABLE", {
  name: 'WEIGHT',
  fileName: 'WEIGHT.txt',
  topLevelTable: true,
  columns: [
    {
      name: 'NDB_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'FOOD_DES',
        colName: 'NDB_No'
      }
    },
    {
      name: 'Seq',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
    },
    { name: 'Amount',       type: 'real',    canBeBlank: false },
    { name: 'Msre_Desc',    type: 'text',    canBeBlank: false },
    { name: 'Gm_Wgt',       type: 'real',    canBeBlank: false },
    { name: 'Num_Data_Pts', type: 'integer', canBeBlank: true },
    { name: 'Std_Dev',      type: 'real',    canBeBlank: true }
  ]
});

define("FOOTNOTE_TABLE", {
  name: 'FOOTNOTE',
  fileName: 'FOOTNOTE.txt',
  topLevelTable: true,
  columns: [
    {
      name: 'NDB_No',
      type: 'text',
      canBeBlank: false,
      foreignKey: {
        table: 'FOOD_DES',
        colName: 'NDB_No'
      }
    },
    { name: 'Footnt_No',  type: 'text', canBeBlank: false },
    { name: 'Footnt_Typ', type: 'text', canBeBlank: false },
    {
      name: 'Nutr_No',
      type: 'text',
      canBeBlank: true,
      foreignKey: {
        table: 'NUTR_DEF',
        colName: 'Nutr_No'
      }
    },
    { name: 'Footnt_Txt', type: 'text', canBeBlank: false }
  ]
});

define("SOURCES_OF_DATA_LINK_TABLE", {
  name: 'DATSRCLN',
  fileName: 'DATSRCLN.txt',
  topLevelTable: true,
  columns: [
    {
      name: 'NDB_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'FOOD_DES',
        colName: 'NDB_No'
      }
    },
    {
      name: 'Nutr_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'NUTR_DEF',
        colName: 'Nutr_No'
      }
    },
    {
      name: 'DataSrc_ID',
      type: 'text',
      canBeBlank: false,
      primaryKey: true,
      foreignKey: {
        table: 'DATA_SRC',
        colName: 'DataSrc_ID'
      }
    }
  ]
});

define("SOURCES_OF_DATA_TABLE", {
  name: 'DATA_SRC',
  fileName: 'DATA_SRC.txt',
  topLevelTable: false,
  columns: [
    {
      name: 'DataSrc_ID',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
    },
    { name: 'Authors',     type: 'text', canBeBlank: true  },
    { name: 'Title',       type: 'text', canBeBlank: false },
    { name: 'Year',        type: 'text', canBeBlank: true  },
    { name: 'Journal',     type: 'text', canBeBlank: true  },
    { name: 'Vol_City',    type: 'text', canBeBlank: true  },
    { name: 'Issue_State', type: 'text', canBeBlank: true  },
    { name: 'Start_Page',  type: 'text', canBeBlank: true  },
    { name: 'End_Page',    type: 'text', canBeBlank: true  }
  ]
});

define("TABLES", [
  this.FOOD_DESCRIPTION_TABLE,
  this.FOOD_GROUP_DESCRIPTION_TABLE,
  this.LANGUAL_FACTOR_TABLE,
  this.LANGUAL_FACTORS_DESCRIPTION_TABLE,
  this.NUTRIENT_DATA_TABLE,
  this.NUTRIENT_DEFINITION_TABLE,
  this.SOURCE_CODE_TABLE,
  this.DATA_DERIVATION_CODE_TABLE,
  this.WEIGHT_TABLE,
  this.FOOTNOTE_TABLE,
  this.SOURCES_OF_DATA_LINK_TABLE,
  this.SOURCES_OF_DATA_TABLE
]);

define("KEY_TABLE", this.FOOD_DESCRIPTION_TABLE);
