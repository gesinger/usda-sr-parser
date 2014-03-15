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
    { name: 'Survey',      type: 'text',    canBeBlank: true  },
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
