const express = require("express");
const app = express();
const { callPostApi, findAllCMSS_Request } = require("./cmss.service");




app.get("/", async (req, res, next) => {
    try {
        const url = "https://api.neoscan.io/api/main_net/v1/get_all_nodes";
        var responseData = await findAllCMSS_Request(url);
        console.log("controller", responseData)
        res.send(responseData);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

app.post('/3pss_request', async (req, res, next) => {
    try {
        const dataRes = await callPostApi(req.url, req.body.data)
        //console.log("controller Success", dataRes)
        res.send(dataRes);

    } catch (error) {
        res.status(500).send({ status: 500, errorMessage: error });
    }
});

app.post('/cmss_request', async (req, res, next) => {
    try {
        let blocks = await callPostApi(req.body.url, req.body);
        res.status(200).send(blocks);
    } catch (error) {
        res.status(500).send({ status: 500, errorMessage: error });
    }
});

module.exports = app;
