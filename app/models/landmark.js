'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;





const landmarkSchema = new Schema({
    name: String,
    description: String,
    category: String,
    userid: String,
    imageURL: String,
    latitude: String,
    longitude: String,
    comment: String,
    star: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


landmarkSchema.statics.findById = function(id) {
    return this.findOne({ _id : id});

    landmarkSchema.statics.findLandMarksInCategory = function(category) {
        return this.find({ category: category}).populate('category').lean();
    };


};









module.exports = Mongoose.model('Landmark', landmarkSchema);