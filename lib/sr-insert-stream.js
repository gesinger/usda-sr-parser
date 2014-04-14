// TODO: remove (unused)

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

SrInsertStream.prototype._sqlValue = function(value, type) {
  switch (type) {
    case 'boolean':
      if (value === 'Y' || value === 'true' || value === true) {
        return 1;
      }
      return 0;
    case 'integer':
      return parseInt(value);
    case 'real':
      return parseFloat(value);
    default:
      return value;
  }
};

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
      // Sqlite expects single quotes to be encoded via doubling the quote
      var columnValue = this._sqlValue(
        columns[i].replace(/'/g, "''"),
        this.table.columns[i].type);
      query += "'" + columnValue + "'";
    }
  }

  query += ");";
  return query;
};

SrInsertStream.prototype._transform = function(chunk, enc, cb) {
  this.push(this._prepareInsertQuery(chunk));
  cb();
};

module.exports = SrInsertStream;
