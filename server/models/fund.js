var mongoose = require('mongoose');
var schema = mongoose.Schema;


var fundSchema = new schema({
	name: {type: String},
	symbol: {type: String},
	price: Number,
	assetClass: {type: String},
	beta: {type: String},
	expenseRatio: {type: String},
	morningstar: {type:Number},
	riskBracket: {type: Number, max: 5, min: 1},
	riskPotential: {type: Number, max: 5, min: 1},
	riskCompatibility: Number
})


module.exports = mongoose.model('Fund', fundSchema);
