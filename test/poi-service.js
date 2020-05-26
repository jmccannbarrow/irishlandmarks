'use strict';

const axios = require('axios');


class PoiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }





    async getAdmins() {
        try {
            const response = await axios.get(this.baseUrl + '/api/admins');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getAdmin(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/admins/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createAdmin(newAdmin) {
        try {
            const response = await axios.post(this.baseUrl + '/api/admins', newAdmin);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllAdmins() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/admins');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneAdmin(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/admins/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }





    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users', newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getLandmarks() {
        try {
            const response = await axios.get(this.baseUrl + '/api/landmarks');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getLandmark(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/landmarks/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createLandmark(newLandmark) {
        try {
            const response = await axios.post(this.baseUrl + '/api/landmarks', newLandmark);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllLandmarks() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/landmarks');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneLandmark(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/landmarks/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }
    async getCategorys() {
        try {
            const response = await axios.get(this.baseUrl + '/api/categorys');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getCategory(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/categorys/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createCategory(newCategory) {
        try {
            const response = await axios.post(this.baseUrl + '/api/categorys', newCategory);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllCategorys() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/categorys');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneCategory(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/categorys/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async authenticate(user) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            return response.data;
        } catch (e) {
            return null;
        }
    }
    async clearAuth(user) {
        axios.defaults.headers.common['Authorization'] = '';
    }


}

module.exports = PoiService;