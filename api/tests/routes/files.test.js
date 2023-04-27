process.env.NODE_ENV = "test";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../app.js";

chai.use(chaiHttp);

describe("GET /files/data", () => {
  it("should return formatted files ", async () => {
    const res = await chai.request(app).get(`/files/data`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  it("should return filter formatted files ", async () => {
    const res = await chai.request(app).get(`/files/data?fileName=test3.csv`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).equal(1);
  });
});

describe("GET /files", () => {
  it("should return formatted files ", async () => {
    const res = await chai.request(app).get(`/files`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("files");
  });
});
