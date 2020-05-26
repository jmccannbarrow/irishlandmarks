'use strict';

const Landmark = require('../models/landmark');
const Boom = require('@hapi/boom');

const Landmarks = {
    findAll: {
        auth: false,
        handler: async function(request, h) {
            const landmarks = await Landmark.find();
            return landmarks;
        }
    },

    findOne: {
        auth: false,
        handler: async function(request, h) {
            try {
                const landmark = await Landmark.findOne({ _id: request.params.id });
                if (!landmark) {
                    return Boom.notFound('No Landmark with this id');
                }
                return landmark;
            } catch (err) {
                return Boom.notFound('No Landmark with this id');
            }
        }
    },

    create: {
        auth: false,
        handler: async function(request, h) {
            const newLandmark = new Landmark(request.payload);
            const landmark = await newLandmark.save();
            if (landmark) {
                return h.response(landmark).code(201);
            }
            return Boom.badImplementation('error creating landmark');
        }
    },

    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            await Landmark.remove({});
            return { success: true };
        }
    },



    deleteOne: {
        auth: false,
        handler: async function(request, h) {
            const landmark = await Landmark.remove({ _id: request.params.id });
            if (landmark) {
                return { success: true };
            }
            return Boom.notFound('id not found');
        }
    },


};

module.exports = Landmarks;