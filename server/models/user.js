var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');
var SALT_WORK_FACTOR = 10;

var userSchema = new schema({
	admin: {type: Boolean, default: false},
	username: { type: String, required: true, index: {  sparse: true }, unique: true },
  password: { type: String, required: true, index: {  sparse: true }, minLength: 7 },
	firstName: {type: String,  required: true},
	lastName: {type: String,  required: true},
	email: {type: String, lowercase: true, required: true},
	suitabilityScore: Number,
	portfolio: [{type: schema.Types.ObjectId, ref: 'Fund'}],
	portfolioNumber: [{number: Number, name: {type: String, unique: true}}],
	portfolioPrice: Number,
	bestMatches: [{type: schema.Types.ObjectId, ref: 'Fund'}],
	bestMatchRatios: [{compatibilityRatio: Number}],
	goodMatches: [{type: schema.Types.ObjectId, ref: 'Fund'}],
	goodMatchRatios: [{compatibilityRatio: Number}],
	okayMatches: [{type: schema.Types.ObjectId, ref: 'Fund'}],
	okayMatchRatios: [{compatibilityRatio: Number}],
	badMatches: [{type: schema.Types.ObjectId, ref: 'Fund'}],
	badMatchRatios: [{compatibilityRatio: Number}]
})

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
