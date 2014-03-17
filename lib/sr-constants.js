function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}

define("FOOD_DESCRIPTION_TABLE", {
  name: 'FOOD_DES',
  fileName: 'FOOD_DES.txt',
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
        colName: 'Src_Cd
      }
    },
    {
      name: 'Deriv_Cd',
      type: 'text',
      canBeBlank: true
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
        colName: 'NDB_No
      }
    },
    { name: 'Add_Nutr_Mark', type: 'boolean', canBeBlank: true },
    { name: 'Num_Studies',   type: 'real',    canBeBlank: true },
    { name: 'Min',           type: 'real',    canBeBlank: true },
    { name: 'Max',           type: 'real',    canBeBlank: true },
    { name: 'DF',            type: 'real',    canBeBlank: true },
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
  columns: [
    {
      name: 'Nutr_No',
      type: 'text',
      canBeBlank: false,
      primaryKey: true
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
