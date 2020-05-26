'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const categorySchema = new Schema({
    Name: String,

});



//categorySchema.statics.findByName = function(Name) {
//return this.findOne({ Name : Name});
//};

categorySchema.statics.findByName = function(Name) {
    return this.findOne({ Name : Name });
};


categorySchema.statics.findById = function(id) {
    return this.findOne({ _id : id});

};



module.exports = Mongoose.model('Category', categorySchema);