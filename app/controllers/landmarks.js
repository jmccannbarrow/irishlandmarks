'use strict';

const Landmark = require('../models/landmark');
const User = require('../models/user');
const Joi = require('@hapi/joi');
const ImageStore = require('../utils/image-store');




const Landmarks = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Famous Irish Landmarks' });
        }
    },
    report: {
        handler: async function(request, h) {
            try{
                const id = request.auth.credentials.id;
                const landmarks = await Landmark.find({user:id}).populate('user').lean();
                //const landmarks = await Landmark.find({userid: id}).lean();
                //const landmarks = await Landmark.findById().populate('user').lean();
                return h.view('report', {
                    title: 'Landmarks to Date',
                    landmarks:landmarks
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    landmark: {
        handler: async function(request, h) {

            try {
                const file = request.payload.imagefile;

                if (Object.keys(file).length > 0) {
                    const url = await ImageStore.uploadImage(request.payload.imagefile);

                    const id = request.auth.credentials.id;
                    const user = await User.findById(id);
                    const data = request.payload;


                    const newLandmark = new Landmark({
                        name: data.name,
                        description: data.description,
                        category: data.category,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        userid: id,
                        imageURL: url,
                        user: user._id
                    });

                    await newLandmark.save();
                    return h.redirect('/report');

                }


            } catch (err) {
                console.log(err);
            }
        },
        payload: {
            multipart: true,
            output: 'data',
            maxBytes: 209715200,
            parse: true
        }

    },


    showLandmarkSettings: {


        handler: async function(request, h) {
            try {

                const landmarkid = request.params.id;

                const landmark = await Landmark.findById(landmarkid).lean();

                console.log(landmark._id);


                return h.view('editlandmark', {title: 'Edit Landmark', landmark: landmark});
            } catch (err) {
                return h.view('/', {errors: [{message: err.message}]});
            }
        }
    },

    viewLandmarkDetails: {


        handler: async function(request, h) {
            try {

                const landmarkid = request.params.id;
                const landmark = await Landmark.findById(landmarkid).lean();


                return h.view('viewlandmarkdetails', {title: 'View Landmark Details', landmark: landmark});
            } catch (err) {
                return h.view('/', {errors: [{message: err.message}]});
            }
        }
    },

    updateLandmark: {
        handler: async function(request, h) {
            try {

                const landmarkedit = request.payload;
                const landmarkid = request.params.id;

                const file = request.payload.imagefile;

                if (Object.keys(file).length > 0) {
                    const url = await ImageStore.uploadImage(request.payload.imagefile);

                    const landmark = await Landmark.findById(landmarkid);
                    landmark.name = landmarkedit.name;
                    landmark.description = landmarkedit.description;
                    landmark.imageURL = url;
                    landmark.category = landmarkedit.category;
                    landmark.latitude = landmarkedit.latitude;
                    landmark.longitude = landmarkedit.longitude;

                    await landmark.save();
                    return h.redirect('/report');

                }


            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }

        },
        payload: {
            multipart: true,
            output: 'data',
            maxBytes: 209715200,
            parse: true
        }

    },

    poilist: {
        handler: async function(request, h) {
            const landmarks = await Landmark.find().populate('contributor').lean();
            return h.view('poilist', {
                title: 'Landmarks to Date',
                landmarks:landmarks
            });
        }
    },

    deleteLandmark: {
        handler: async function (request, h) {
            try {

                const landmarkid = request.params.id
                const landmark  = await Landmark.findById(landmarkid)
                const deleteLandmark  = await Landmark.findByIdAndRemove(landmarkid);


                return h.redirect('/report');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }

    },

};



module.exports = Landmarks;