"use strict";

const SapCfAxios = require('sap-cf-axios').default;
const axios = process.env.NODE_ENV === 'test' ? require("axios") : SapCfAxios('DSM');

const findAllCMSS_Request = async (url) => {
    // return new Promise(async (resolve, reject) => {
    console.log("Get service initiated with URL", url);
    try {
        const data = await axios.get(url);
        console.log("Get Service successful with data: ", data.data);
        return data.data;
    } catch (err) {
        console.log(err);
    }
    // });
}
const callPostApi = async (url, payload) => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    // return new Promise(async (resolve, reject) => {
    try {
        const dataResp = await axios({
            // await axios({
            method: "POST",
            url: url,
            data: payload,
            headers: {
                "content-type": "application/json",
                'Authorization': 'basic T64Mdy7m['
            }
        });
        return dataResp.data;
    } catch (error) {
        return error.response;
    }
}

module.exports = {
    findAllCMSS_Request,
    callPostApi
}
