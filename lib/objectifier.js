var mappings = require('../config/mappings.json');
var ProgressBar = require('progress');

function associatedTableValues(assocObject, fieldName, keyToRemove) {
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

function joinRelatedFoodTables(db, foodDescription, cb) {
  var food = foodDescription.values;

  food.foodGroup = food.foodGroup.values;
  delete food.foodGroupCode;

  // TODO mappings
  food.nutritionData = associatedTableValues(
    food.nutritionData,
    'nutritionData',
    'ndbNumber');
  food.langualFactorDescriptions = associatedTableValues(
    food.langualFactorDescriptions,
    'langualFactorDescriptions',
    'langualFactorLink');
  food.weights = associatedTableValues(
    food.weights,
    'weights',
    'ndbNumber');
  food.footnotes = associatedTableValues(
    food.footnotes,
    'footnotes',
    'ndbNumber');
  //food.dataSources = associateTableValues(
  //  food.dataSources,
  //  'dataSources');

  cb(food);
}

function generateFood(db, foodDescriptionId, cb) {
  var foodDesModel = db[mappings['FOOD_DES'].name];
  var foodDesModel = db[mappings['FOOD_DES'].name];
  var fdGroupModel = db[mappings['FD_GROUP'].name];
  var langdescModel =db[mappings['LANGDESC'].name];
  var nutDataModel = db[mappings['NUT_DATA'].name];
  var weightModel = db[mappings['WEIGHT'].name];
  var footnoteModel = db[mappings['FOOTNOTE'].name];
  //var dataSrcModel = db[mappings['DATA_SRC'].name];

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
    joinRelatedFoodTables(db, foodDescription, cb);
  }.bind(this));
}

module.exports.generateFoods = function(db, cb) {
  var foodDesModel = db[mappings['FOOD_DES'].name];
  var foodDesId = mappings['FOOD_DES'].columns['NDB_No'];

  var foods = [];

  foodDesModel.findAll({
    attributes: [foodDesId]
  }).success(function(foodDescriptions) {
    var remainingFoodCount = foodDescriptions.length;

    var progressString = '[:bar] :percent (:current/:total) :etas'
    var progressBar = new ProgressBar(progressString, {
      complete: '=',
      incomplete: ' ',
      width: 40,
      total: foodDescriptions.length
    });

    for (foodDescriptionKey in foodDescriptions) {
      var foodDescription = foodDescriptions[foodDescriptionKey];
      generateFood(db, foodDescription[foodDesId], function(food) {
        foods.push(food);

        progressBar.tick(1);

        if (--remainingFoodCount === 0) {
          cb(foods);
        }
      });
    }
  }.bind(this));
};
