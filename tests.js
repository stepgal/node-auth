const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("./server");

describe("GET /user/test@test.com/password", () => {
    before(function (done) {
        server.on("appStarted", () => {
            done();
        });
    });
    it("it should return status code - 200", (done) => {
        setTimeout(done, 1500);
        chai.request(server)
            .get("/user/test@test.com/password")
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
    it("it should response status OK", (done) => {
        setTimeout(done, 1500);
        chai.request(server)
            .get("/user/test@test.com/password")
            .end((err, res) => {
                expect(res.body.status).to.equal("OK1");
                done();
            });
    });
});
