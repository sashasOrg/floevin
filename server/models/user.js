var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	firstName: {type: String, lowercase: true, required: true},
	lastName: {type: String, lowercase: true, required: true},
	email: {type: String, lowercase: true, required: true},
	password: {type: String, lowercase: true, minlength: 7},
	suitabilityScore: Number, ?
	form: {
		question1: {type: Number, minlength: 1, maxlength: 5},
		question2: {type: Number, minlength: 1, maxlength: 5},
		question3: {type: Number, minlength: 1, maxlength: 5},
		question4: {type: Number, minlength: 1, maxlength: 5},
		question5: {type: Number, minlength: 1, maxlength: 5},
		question6: {type: Number, minlength: 1, maxlength: 5},
		question7: {type: Number, minlength: 1, maxlength: 5},
		question8: {type: Number, minlength: 1, maxlength: 5},
		question9: {type: Number, minlength: 1, maxlength: 5},
		question10: {type: Number, minlength: 1, maxlength: 5}
		},
	portfolio: {type: schema.Types.ObjectId, ref: Portfolio}
})

module.exports = mongoose.model('User', userSchema);