'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');          // ADDED

const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

adminSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

adminSchema.methods.comparePassword = async function(adminPassword) {        // EDITED
    const isMatch = await bcrypt.compare(adminPassword, this.password);
    return isMatch;
};



module.exports = Mongoose.model('Admin', adminSchema);
