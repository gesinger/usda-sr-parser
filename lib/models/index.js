var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , db        = {}

var Index = function(dbName, dbPath) {
  var sequelize = new Sequelize(dbName, 'root', null, {
    dialect: 'sqlite',
    storage: dbPath
  });

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file))
      db[model.name] = model
    })
   
  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  return lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
  }, db)
};

module.exports = Index;
