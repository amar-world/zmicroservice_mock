const request = require('supertest')
const app = require("../../../app");

// const SapCfAxios = require('sap-cf-axios').default;
// const axios = SapCfAxios('DSM');


const axios = require("axios");

const MockAdapter = require("axios-mock-adapter");

// const url = 'https://cpea-innovapost-inc-development-dn6yj4ti-devspace-cmjso57580409.cfapps.ca10.hana.ondemand.com';
const url = "/3pss_request";
const mock = new MockAdapter(axios);

beforeAll(async () => {
  process.env.CDS_ENV = "test"
  mock.reset();
});

const payloadData = require("./paylod.json");

const responseData = {
  data: {
    success: true
  }
};

const payload = {
  url: url,
  data: payloadData
}

describe("Test CMSS API", () => {
  it("Should Throw 500 error with wrong payload", async () => {
    // var oNoPalylodReq = {
    //   url: url,
    var oNoPalylodReq = {
      data: { someDummy: "" }
    };
    var oNoPayloadExpected = { error: "Payload is not correct" };
    mock.onPost(url).replyOnce(() => { return [500, oNoPayloadExpected] });
    const res = await request(app).post("/api/cmss/3pss_request").send(oNoPalylodReq);
    //console.log("mock res", res);
    expect(res._body.data).toMatchObject(oNoPayloadExpected);
    expect(res._body.status).toBe(500);
  });

  it("should create a CMSS REQUEST in POST With Success Message", async () => {
    // console.log("mockdata Payload: before test execute");

    mock.onPost(url).reply(() => {
      return [
        200,
        {
          success: true,
        },
      ];
    });
    const res = await request(app).post("/api/cmss/3pss_request").send(payloadData);
    expect(res._body).toMatchObject(responseData.data);
    expect(res.statusCode).toBe(200);
  });
});
