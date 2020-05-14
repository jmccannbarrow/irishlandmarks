'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');          // ADDED

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,


});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};


userSchema.statics.findById = function(userid) {
    return this.findOne({_id: userid});
    //
};

userSchema.methods.comparePassword = async function(userPassword) {        // EDITED
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
};



//userSchema.methods.comparePassword = function(userPassword) {
// const isMatch = this.password === userPassword;
// if (!isMatch) {
//throw Boom.unauthorized('Password mismatch');
// }
// return this;
//};

module.exports = Mongoose.model('User', userSchema);
