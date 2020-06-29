const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("./server");

const publicIp = require("public-ip");
describe("GET /user/test@test.com/password", () => {
    before(function (done) {
        setTimeout(done, 1000);
        publicIp.v4().then(ip => {
            console.log("your public ip address", ip);
        });
        server.on("appStarted", () => {
            done();
        });
    });
    it("it should return status code - 200", (done) => {
        //setTimeout(done, 3000);
        chai.request(server)
            .get("/user/test@test.com/password")
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
    it("it should response status OK", (done) => {
        //setTimeout(done, 3000);
        chai.request(server)
            .get("/user/test@test.com/password")
            .end((err, res) => {
                expect(res.body.status).to.equal("OK");
                done();
            });
    });
});

// describe("should GET /user/test@test.com/password status(200)", function () {
//     it("should return 200", function (done) {
//         setTimeout(done, 1000);
//         server.get("/user/test@test.com/password", function (err, res, body) {
//             expect(res.statusCode).to.equal(200);
//             expect(res.body.status).to.equal("OK");
//             done();
//         });
//     });
// });
