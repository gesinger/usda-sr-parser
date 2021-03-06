var stream = require('stream');
var util = require('util');
var elasticsearch = require('elasticsearch');

var Writable = stream.Writable;

var Indexer = function(esHost) {
  if (!(this instanceof Indexer)) {
    return new Indexer();
  }

  this.index = 'foods';
  this.client = new elasticsearch.Client({
      host: esHost,
      log: 'error'
  });

  Writable.call(this, { objectMode: true });
};
util.inherits(Indexer, Writable);

Indexer.prototype._write = function(chunk, enc, next) {
  this.client.create({
    index: this.index,
    type: 'food',
    body: chunk
  }, function(err, resp) {
    if (err) {
      console.log(err);
      // Debated whether to throw or not, but no line should be ill formatted.
      // Thus, it is wise to find such occurrences and fix the file if need be.
      throw err;
    }

    next();
  });
};

module.exports = Indexer;
