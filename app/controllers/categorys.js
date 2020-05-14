'use strict';
const Category = require('../models/category');

const Categorys = {

    categoryreport: {
        handler: async function(request, h) {
            try{

                const categorys = await Category.find().lean();
                //const landmarks = await Landmark.find({userid: id}).lean();
                //const landmarks = await Landmark.findById().populate('user').lean();
                return h.view('categoryreport', {
                    title: 'Categorys',
                    categorys:categorys
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }


    },
    category: {
        auth: false,
        handler: async function(request, h) {


            try {

                const payload = request.payload;
                const newCategory = new Category({
                    Name: payload.Name,

                });
                const category = await newCategory.save();
                request.cookieAuth.set({ id: category.id });
                return h.redirect('/categoryreport');



            } catch (err) {
                console.log(err);
            }
        },

    },

    showCreateCategory: {
        auth: false,
        handler: function(request, h) {
            return h.view('createcategory', { title: 'Categorys' });
        }
    },

    createcategory: {
        handler: async function(request, h) {

            try {





                const payload = request.payload;
                const newCategory = new Category({
                    Name: payload.Name,

                });
                const category = await newCategory.save();
                request.cookieAuth.set({ id: category.id });
                return h.redirect('/categoryreport');




            } catch (err) {
                console.log(err);
            }
        },

    },






    categorylist: {
        handler: async function(request, h) {
            const categorys = await Category.find().lean();
            return h.view('/categoryreport', {
                title: 'Categorys',

            });
        }
    },

    managecategorys: {
        handler: async function(request, h) {
            const categorys = await Category.find().lean();
            return h.view('managecategorys', {
                title: 'All Categorys',
                categorys:categorys
            });
        }
    },




};



module.exports = Categorys;