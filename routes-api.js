const Landmarks = require('./app/api/landmarks');
const Users= require('./app/api/users');
const Admins= require('./app/api/admin');

module.exports = [
    { method: 'GET', path: '/api/landmarks', config: Landmarks.findAll },
    { method: 'GET', path: '/api/landmarks/{id}', config: Landmarks.findOne },
    { method: 'POST', path: '/api/landmarks', config: Landmarks.create },
    { method: 'DELETE', path: '/api/landmarks/{id}', config: Landmarks.deleteOne },
    { method: 'DELETE', path: '/api/landmarks', config: Landmarks.deleteAll },

    { method: 'GET', path: '/api/users', config: Users.find },
    { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
    { method: 'POST', path: '/api/users', config: Users.create },
    { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
    { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

    { method: 'GET', path: '/api/admins', config: Admins.find },
    { method: 'GET', path: '/api/admins/{id}', config: Admins.findOne },
    { method: 'POST', path: '/api/admins', config: Admins.create },
    { method: 'DELETE', path: '/api/admins/{id}', config: Admins.deleteOne },
    { method: 'DELETE', path: '/api/admins', config: Admins.deleteAll },

];