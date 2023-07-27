"use strict" ;
const express = require('express');
const xsenv = require('@sap/xsenv');
const xssec = require('@sap/xssec');
const passport = require('passport');
const cfenv = require("cfenv");
const SapCfAxios = require('sap-cf-axios').default;

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

// let oAppEnv = cfenv.getAppEnv();
// let boundServices = oAppEnv.services;  
// let uaaServiceName = boundServices["xsuaa"][0].name;

// xsenv.loadEnv();
// const uaaService = xsenv.getServices({uaa: uaaServiceName });
// passport.use('JWT', new xssec.JWTStrategy(uaaService.uaa));
// app.use(passport.initialize());
// app.use(passport.authenticate('JWT', { session: false }));


const Axios = SapCfAxios('DSM');
async function callPostApi(url, payload) {
    return new Promise( (resolve, reject)=> {
       Axios({
               method: "POST", 
               url: url,
               data: payload, 
               headers: {"content-type": "application/json"}
            }
        ).then((dataResp) => {
            resolve(dataResp.data)
        })
        .catch( (error) =>{
            reject(error)   
        });
    });
}

app.post('/3pss_request',async(requestObject, responseObject, next) => {
try {
    
    let blocks =  await callPostApi(requestObject.url, requestObject.body);
 responseObject.send(blocks);
} catch (error) {
    console.log(error);
  responseObject.status(500);
  responseObject.send({status : 500,errorMessage : error});
}
}); 

app.post('/cmss_request',async(requestObject, responseObject, next) => {
    try {
    let blocks =  await callPostApi(requestObject.url, requestObject.body);
     responseObject.send(blocks);
    } catch (error) {
        console.log(error);
      responseObject.status(500);
      responseObject.send({status : 500,errorMessage : error});
    }
    }); 

app.listen(PORT, () => {
})
