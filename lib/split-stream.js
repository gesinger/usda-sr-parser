var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

var SplitStream = function() {
  // allow use without new
  if (!(this instanceof SplitStream)) {
    return new SplitStream();
  }

  // init Transform
  Transform.call(this, { objectMode: true });
};
util.inherits(SplitStream, Transform);

SplitStream.prototype._cleanCol = function(dirtyCol) {
  return dirtyCol
           .replace('\r', '')
           .replace(/^~/, '')
           .replace(/~$/, '');
};

SplitStream.prototype._transform = function(chunk, enc, cb) {
  var cols = chunk.toString().split("^");
  var cleanCols = [];
  cols.forEach((function(col) {
    cleanCols.push(this._cleanCol(col));
  }).bind(this));
  this.push(cleanCols);
  cb();
};

module.exports = SplitStream;
