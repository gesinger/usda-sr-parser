var stream = require('stream');
var util = require('util');
var mappings = require('../config/mappings.json');
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

  food.foodGroup = food.foodGroup.values;
  delete food.foodGroupCode;

  // TODO mappings
  food.nutritionData = this._associatedTableValues(
    food.nutritionData,
    'nutritionData',
    'ndbNumber');
  food.langualFactorDescriptions = this._associatedTableValues(
    food.langualFactorDescriptions,
    'langualFactorDescriptions',
    'langualFactorLink');
  food.weights = this._associatedTableValues(
    food.weights,
    'weights',
    'ndbNumber');
  food.footnotes = this._associatedTableValues(
    food.footnotes,
    'footnotes',
    'ndbNumber');
  //food.dataSources = this._associateTableValues(
  //  food.dataSources,
  //  'dataSources');

  cb(food);
}

Objectifier.prototype._generateFood = function(foodDescriptionId, cb) {
  var foodDesModel = this.db[mappings['FOOD_DES'].name];
  var foodDesModel = this.db[mappings['FOOD_DES'].name];
  var fdGroupModel = this.db[mappings['FD_GROUP'].name];
  var langdescModel = this.db[mappings['LANGDESC'].name];
  var nutDataModel = this.db[mappings['NUT_DATA'].name];
  var weightModel = this.db[mappings['WEIGHT'].name];
  var footnoteModel = this.db[mappings['FOOTNOTE'].name];
  //var dataSrcModel = this.db[mappings['DATA_SRC'].name];

  var whereClause = {};
  whereClause[mappings['FOOD_DES'].columns['NDB_No']] = foodDescriptionId;

  foodDesModel.find({
    where: whereClause,
    include: [
      { model: fdGroupModel, as: 'foodGroup' },
      { model: langdescModel },
      { model: nutDataModel },
      { model: weightModel },
      { model: footnoteModel }
      //{ model: dataSrcModel }
    ]
  }).success(function(foodDescription) {
    this._joinRelatedFoodTables(foodDescription, cb);
  }.bind(this));
}

module.exports = Objectifier;
