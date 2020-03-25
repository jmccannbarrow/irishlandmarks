const Landmarks = require('./app/controllers/landmarks');

module.exports = [
    { method: 'GET', path: '/', config: Landmarks.index },

    { method: 'GET', path: '/signup', config: Landmarks.signup },
    { method: 'GET', path: '/login', config: Landmarks.login },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        }
    }
];