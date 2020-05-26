'use strict';
const Landmark = require('../models/landmark');
const Category = require('../models/category');
const Boom = require('@hapi/boom');
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
                let category = await Category.findByName(payload.Name.toUpperCase());
                //compare upper case value with upper case values

                if (category) {
                    const message = 'Category is already registered';
                    throw Boom.badData(message);
                }
                const newCategory = new Category({
                    Name: payload.Name.toUpperCase(),

                });
                category = await newCategory.save();
                //request.cookieAuth.set({ id: category.id });
                return h.redirect('/categoryreport');



            } catch (err) {
                return h.view('createcategory', { errors: [{ message: err.message }] });
            }
        }

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

    showCategorySettings: {


        handler: async function(request, h) {
            try {

                const categoryid = request.params.id;

                const category = await Category.findById(categoryid).lean();

                console.log(category._id);


                return h.view('editcategory', {title: 'Edit Category', category: category});
            } catch (err) {
                return h.view('/', {errors: [{message: err.message}]});
            }
        }
    },


    viewCategoryDetails: {


        handler: async function(request, h) {
            try {

                const categoryid = request.params.id;

                const category = await Category.findById(categoryid).lean();


                return h.view('categorydetails', {title: 'View Category Details', category: category});
            } catch (err) {
                return h.view('/', {errors: [{message: err.message}]});
            }
        }
    },

    updateCategory: {
        handler: async function(request, h) {


            try {

                const categoryedit = request.payload;
                const categoryid = request.params.id;

                console.log(categoryid);
                console.log(categoryedit);


                const category  = await Category.findById(categoryid)
                category.Name = categoryedit.Name.toUpperCase();




                await category.save();
                return h.redirect('/categoryreport');




            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }



        },

    },


    deleteCategory: {
        handler: async function (request, h) {
            try {

                const categoryid = request.params.id;
                console.log(categoryid);
                const category = await Category.findById(categoryid);
                const categoryname = category.Name;
                console.log(categoryname);
//Need method to search landmarks by category
                const landmarks = await Landmark.find({category:categoryname}).lean();

                //IF LANDMARKS dont EXIST WITH THE CATEGORY marked FOR DELETION THEN delete category
                if (landmarks.length == 0) {
                    console.log("Length = 0");

                    await category.remove();

                }
                //Else quit and advise  advise user to reassign category
                else {
                    console.log("Length <> 0");

                    const message = 'Landmarks exists for this category.Re-assign the category before deleting the category.';
                    throw Boom.unauthorized(message);

                }

                return h.redirect('/categoryreport');


            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }


    },


};



module.exports = Categorys;