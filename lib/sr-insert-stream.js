var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

var SrInsertStream = function(table) {
  this.table = table;

  // allow use without new
  if (!(this instanceof SrInsertStream)) {
    return new SrInsertStream();
  }

  // init Transform 
  Transform.call(this, { objectMode: true });
};
util.inherits(SrInsertStream, Transform);

SrInsertStream.prototype._prepareInsertQuery = function(columns) {
  var query = 'INSERT INTO ' + this.table.name + ' VALUES (';

  var i;
  for (i=0; i<columns.length; ++i) {
    if (i != 0) {
      query += ',';
    }

    if (!columns[i]) {
      if (!this.table.columns[i].canBeBlank) {
        throw new Error('Column ' + i +
                        ' in table ' + table.name +
                        ' can not be blank');
      }
      query += 'NULL';
    } else {
      query += '"' + columns[i] + '"';
    }
  }

  query += ")";
  return query;
};

SrInsertStream.prototype._transform = function(chunk, enc, cb) {
  this.push(this._prepareInsertQuery(chunk));
  cb();
};

module.exports = SrInsertStream;
