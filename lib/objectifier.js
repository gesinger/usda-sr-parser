var stream = require('stream');
var util = require('util');
var mappings = require('./config').getMappings();
var ProgressBar = require('progress');

var Readable = stream.Readable;

var Objectifier = function(db) {
  if (!(this instanceof Objectifier)) {
    return new Objectifier();
  }

  this.db = db;
  this.foodDescriptionIds;
  this.currentIndex = 0;

  // init Readable
  Readable.call(this, { objectMode: true });
};
util.inherits(Objectifier, Readable);

Readable.prototype._pushFood = function() {
  if (this.currentIndex === this.foodDescriptionIds.length) {
    return this.push(null);
  }

  this._generateFood(
    this.foodDescriptionIds[this.currentIndex++],
    function(food) {

    this.push(food);
  }.bind(this));
};

Readable.prototype._read = function() {
  if (!this.foodDescriptionIds) {
    return this._initializeFoodDescriptionIds(this._pushFood.bind(this));
  }

  this._pushFood();
};

Objectifier.prototype._initializeFoodDescriptionIds = function(cb) {
  var foodDesModel = this.db[mappings['FOOD_DES'].name];
  var foodDesId = mappings['FOOD_DES'].columns['NDB_No'];

  var foods = [];

  foodDesModel.findAll({
    attributes: [foodDesId]
  }).success(function(foodDescriptions) {
    var remainingFoodCount = foodDescriptions.length;

    this.foodDescriptionIds = [];

    for (foodDescriptionKey in foodDescriptions) {
      var foodDescription = foodDescriptions[foodDescriptionKey];
      var foodDescriptionId = foodDescription[foodDesId];
      this.foodDescriptionIds.push(foodDescriptionId);
    }

    cb();
  }.bind(this));

};

Objectifier.prototype.getFoodDescriptionIds = function() {
  return this.foodDescriptionIds;
};

Objectifier.prototype._associatedTableValues =
  function(assocObject, fieldName, keyToRemove) {

  var result = [];
  if (assocObject && assocObject.length > 0) {
    for (var key in assocObject) {
      var val = assocObject[key];
      var actualValues = val.values;
      if (keyToRemove) {
        delete actualValues[keyToRemove];
      }
      result.push(actualValues);
    }
  }
  return result;
}

Objectifier.prototype._joinRelatedFoodTables =
  function(foodDescription, cb) {

  var food = foodDescription.values;

  var foodGroupMapping = mappings['FD_GROUP'];
  var foodGroupTableName = foodGroupMapping.name;
  var foodGroupForeignMapping = foodGroupMapping.columns['FdGrp_Cd'];
  food[foodGroupTableName] = food[foodGroupTableName].values;
  delete food[foodGroupForeignMapping];

  var nutDataMapping = mappings['NUT_DATA'];
  var nutDataTableName = nutDataMapping.name;
  var nutDataKeyMapping = nutDataMapping.columns['NDB_No'];
  food[nutDataTableName] = this._associatedTableValues(
    food[nutDataTableName],
    nutDataTableName,
    nutDataKeyMapping);

  var nutrDefMapping = mappings['NUTR_DEF'];
  var nutrDefTableName = nutrDefMapping.name;

  var srcCdMapping = mappings['SRC_CD'];
  var srcCdTableName = srcCdMapping.name;

  var derivCdMapping = mappings['DERIV_CD'];
  var derivCdTableName = derivCdMapping.name;

  var nutDataNutrDefKey = nutDataMapping.columns['Nutr_No'];
  var nutDataSrcCdKey = nutDataMapping.columns['Src_Cd'];
  var nutDataDerivCdKey = nutDataMapping.columns['Deriv_Cd'];

  for (var nutDataKey in food[nutDataTableName]) {
    food[nutDataTableName][nutDataKey][nutrDefTableName] =
      food[nutDataTableName][nutDataKey][nutrDefTableName].values;
    delete food[nutDataTableName][nutDataKey][nutDataNutrDefKey];

    food[nutDataTableName][nutDataKey][srcCdTableName] =
      food[nutDataTableName][nutDataKey][srcCdTableName].values;
    delete food[nutDataTabelName][nutDataKey][nutDataSrcCdKey];

    food[nutDataTableName][nutDataKey][derivCdTableName] =
      food[nutDataTableName][nutDataKey][derivCdTableName].values;
    delete food[nutDataTableName][nutDataKey][nutDataDerivCdKey];
  }
  console.log(food);

  var langdescMapping = mappings['LANGDESC'];
  var langdescTableName = langdescMapping.name;
  var langdescKeyMapping = langdescMapping.columns['Factor_Code'];
  food[langdescTableName] = this._associatedTableValues(
    food[langdescTableName],
    langdescTableName,
    langDescKeyMapping); // TODO langualfactorlink ?

  var weightMapping = mappings['WEIGHT'];
  var weightTableName = weightMapping.name;
  var weightKeyMapping = weightMapping.columns['NDB_No'];
  food[weightTableName] = this._associatedTableValues(
    food[weightTableName],
    weightTableName,
    weightKeyMapping);

  var footnoteMapping = mappings['FOOTNOTE'];
  var footnoteTableName = footnoteMapping.name;
  var footnoteKeyMapping = footnoteMapping.columns['NDB_No'];
  food[footnoteTableName] = this._associatedTableValues(
    food[footnoteTableName],
    footnoteTableName,
    footnoteKeyMapping);

  //food.dataSources = this._associateTableValues(
  //  food.dataSources,
  //  'dataSources');

  cb(food);
}

Objectifier.prototype._generateFood = function(foodDescriptionId, cb) {
  var foodDesModel = this.db[mappings['FOOD_DES'].name];
  var fdGroupModel = this.db[mappings['FD_GROUP'].name];
  var langdescModel = this.db[mappings['LANGDESC'].name];
  var nutDataModel = this.db[mappings['NUT_DATA'].name];
  var nutrDefModel = this.db[mappings['NUTR_DEF'].name];
  var srcCdModel = this.db[mappings['SRC_CD'].name];
  var derivCdModel = this.db[mappings['DERIV_CD'].name];
  var weightModel = this.db[mappings['WEIGHT'].name];
  var footnoteModel = this.db[mappings['FOOTNOTE'].name];
  //var dataSrcModel = this.db[mappings['DATA_SRC'].name];

  var whereClause = {};
  whereClause[mappings['FOOD_DES'].columns['NDB_No']] = foodDescriptionId;

  foodDesModel.find({
    where: whereClause,
    include: [
      { model: fdGroupModel },
      { model: langdescModel },
      {
        model: nutDataModel,
        include: [
          { model: nutrDefModel },
          { model: srcCdModel },
          { model: derivCdModel }
        ]
      },
      { model: weightModel },
      { model: footnoteModel }
      //{ model: dataSrcModel }
    ]
  }).success(function(foodDescription) {
    this._joinRelatedFoodTables(foodDescription, cb);
  }.bind(this));
}

module.exports = Objectifier;
