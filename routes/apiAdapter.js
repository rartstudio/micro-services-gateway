const axios = require('axios');

const {TIMEOUT} = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseURL : baseUrl,
        //variable from .env is always string dont forget to parse it
        timeout: parseInt(TIMEOUT)
    });
}