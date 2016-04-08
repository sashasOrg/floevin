var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fundShema = new schema({
	riskBracket: Number,
	name: {type: String, lowercase: true},
	symbol: {type: String, lowercase: true},
	price: Number,
	assetClass: {type: String, lowercase: true},
	dailyMarketValue: Number,
	yieldSEC: Number,
	yieldCompound: Number,
	expenseRatio: Number,
	loadType: {type:String, enum: ['front-end', 'back-end']},
	riskPotential: Number,
	allocation categories: [{type: String}]
})

module.exports = mongoose.model('Fund', fundSchema);