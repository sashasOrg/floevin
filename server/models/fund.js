var mongoose = require('mongoose');
var schema = mongoose.Schema;


var fundSchema = new schema({
	name: {type: String},
	symbol: {type: String},
	price: Number,
	assetClass: {type: String},
	beta: {type: String},
	expenseRatio: {type: String},
	morningstar: {type:String},
	riskBracket: Number,
	riskPotential: Number
})
fundSchema.add:({morningstar:{type:String}});
fundSchema.add = function add(obj, prefix) {
  prefix = prefix || '';
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];

    if (obj[key] == null) {
      throw new TypeError('Invalid value for schema path `' + prefix + key + '`');
    }

    if (Array.isArray(obj[key]) && obj[key].length === 1 && obj[key][0] == null) {
      throw new TypeError('Invalid value for schema Array path `' + prefix + key + '`');
    }

    if (utils.isObject(obj[key]) &&
        (!obj[key].constructor || utils.getFunctionName(obj[key].constructor) === 'Object') &&
        (!obj[key][this.options.typeKey] || (this.options.typeKey === 'type' && obj[key].type.type))) {
      if (Object.keys(obj[key]).length) {
        // nested object { last: { name: String }}
        this.nested[prefix + key] = true;
        this.add(obj[key], prefix + key + '.');
      } else {
        this.path(prefix + key, obj[key]); // mixed type
      }
    } else {
      this.path(prefix + key, obj[key]);
    }
  }
};

module.exports = mongoose.model('Fund', fundSchema);
