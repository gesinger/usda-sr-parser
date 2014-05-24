// Uses the singleton pattern to allow modules to require config separately
// while obtaining the same configuration settings. We achieve this by using
// the module's native caching mechanism to always export the same instance.

var Config = function() {
  var mappings;

  this.setMappings = function(mappingsFilePath) {
    // Assumption is that we are passed the absolute path
    this.mappings = require(mappingsFilePath);
  };

  this.getMappings = function() {
    return this.mappings;
  };
};

module.exports = new Config();
