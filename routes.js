'use strict';

const Accounts = require('./app/controllers/accounts');
const Landmarks = require('./app/controllers/landmarks');
const Categorys = require('./app/controllers/categorys');


module.exports = [

    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'GET', path: '/settings/showSettings/{id}', config: Accounts.showSettings },
    { method: 'POST', path: '/settings/{id}', config: Accounts.updateSettings },




    { method: 'GET', path: '/signupadmin', config: Accounts.showsignupadmin },
    { method: 'POST', path: '/signupadmin', config: Accounts.signupadmin },
    { method: 'GET', path: '/loginadmin', config: Accounts.showLoginAdmin },
    { method: 'GET', path: '/logoutadmin', config: Accounts.logoutadmin },
    { method: 'POST', path: '/loginadmin', config: Accounts.loginadmin},


    { method: 'GET', path: '/createuser', config: Accounts.showCreateuser },
    { method: 'POST', path: '/createuser', config: Accounts.createuser },
    { method: 'GET', path: '/accounts/deleteUser/{id}', config: Accounts.deleteUser },



    { method: 'GET', path: '/home', config: Landmarks.home },
    { method: 'GET', path: '/report',  config: Landmarks.report },
    { method: 'POST', path: '/landmark', config: Landmarks.landmark },


    { method: 'GET', path: '/createlandmark', config: Landmarks.showCreateLandmark },


    { method: 'POST', path: '/managelandmarks', config: Landmarks.createlandmark },



    { method: 'GET', path: '/categoryreport',  config: Categorys.categoryreport },
    { method: 'POST', path: '/category', config: Categorys.category },

    { method: 'GET', path: '/managecategorys',  config: Categorys.managecategorys },

    { method: 'GET', path: '/createcategory', config: Categorys.showCreateCategory },
    { method: 'POST', path: '/createcategory', config: Categorys.createcategory },
    { method: 'GET', path: '/category/viewCategoryDetails/{id}', config: Categorys.viewCategoryDetails },
    { method: 'GET', path: '/category/showCategorySettings/{id}', config: Categorys.showCategorySettings },
    { method: 'POST', path: '/editcategory/{id}', config: Categorys.updateCategory },
    { method: 'GET', path: '/category/deleteCategory/{id}', config: Categorys.deleteCategory },

    { method: 'GET', path: '/managelandmarks',  config: Landmarks.managelandmarks },


    { method: 'POST', path: '/findLandmarksBycategory',  config: Landmarks.findLandmarksBycategory },

    { method: 'GET', path: '/manageusers',  config: Accounts.manageusers },

    { method: 'GET', path: '/landmark/viewLandmarkDetails/{id}', config: Landmarks.viewLandmarkDetails },
    { method: 'GET', path: '/landmark/showLandmarkSettings/{id}', config: Landmarks.showLandmarkSettings },
    { method: 'POST', path: '/editlandmark/{id}', config: Landmarks.updateLandmark },
    { method: 'GET', path: '/landmark/showCommentSettings/{id}', config: Landmarks.showCommentSettings },
    { method: 'POST', path: '/editlandmarkcomment/{id}', config: Landmarks.addcomment },
    { method: 'GET', path: '/landmark/deleteLandmark/{id}', config: Landmarks.deleteLandmark },


    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }



];