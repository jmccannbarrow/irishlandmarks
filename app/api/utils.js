const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createToken = function (user) {
    const payload = {
        id: user._id,
        email: user.email,
    };
    const options = {
        algorithm: 'HS256',
        expiresIn: '1h',
    };
    return jwt.sign(payload, 'secretpasswordnotrevealedtoanyone', options);
};

exports.validate = async function(decoded, request) {
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
        return { isValid: false };
    } else {
        return { isValid: true };
    }
};

exports.decodeToken = function (token) {
    const userInfo = {};
    try {
        var decoded = jwt.verify(token, 'secretpasswordnotrevealedtoanyone');
        userInfo.userId = decoded.id;
        userInfo.email = decoded.email;
    } catch (e) {
    }
    return userInfo;
};

exports.getUserIdFromRequest = function(request) {
    var userId = null;
    try {
        const authorization = request.headers.authorization;
        var token = authorization.split(' ')[1];
        var decodedToken = jwt.verify(token, 'secretpasswordnotrevealedtoanyone');
        userId = decodedToken.id;
    } catch (e) {
        userId = null;
    }
    return userId;
};