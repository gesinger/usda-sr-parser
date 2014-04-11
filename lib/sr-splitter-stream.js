// TODO: remove (unused)

var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

var SrSplitterStream = function() {
  // allow use without new
  if (!(this instanceof SrSplitterStream)) {
    return new SrSplitterStream();
  }

  // init Transform
  Transform.call(this, { objectMode: true });
};
util.inherits(SrSplitterStream, Transform);

SrSplitterStream.prototype._cleanCol = function(dirtyCol) {
  return dirtyCol
           .replace('\r', '')
           .replace(/^~/, '')
           .replace(/~$/, '');
};

SrSplitterStream.prototype._transform = function(chunk, enc, cb) {
  var cols = chunk.toString().split("^");
  var cleanCols = [];
  cols.forEach((function(col) {
    cleanCols.push(this._cleanCol(col));
  }).bind(this));
  this.push(cleanCols);
  cb();
};

module.exports = SrSplitterStream;
