var sqlite3 = require('sqlite3');

var database = function(path) {
  // TODO add version
  var db = new sqlite3.Database('sr.db');

  db.serialize(function() {
    db.run('CREATE TABLE ndb (num)');
    db.parallelize(function() {
    });
  });
}

module.exports = database;
