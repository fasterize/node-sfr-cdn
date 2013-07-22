var should = require('should'),
    nock = require('nock'),
    CDN = require('../lib/cdn');

describe("CDN test with a fake server", function() {
  var cdn,
      server = 'http://api.cdn/';

  beforeEach(function () {
    cdn = new CDN('login', 'key', server);
  });

  describe("#request", function () {
    describe("when success", function () {
      it("should send a request", function (done) {
        nock(server)
          .post('/')
          .reply(200, {result: true});

        cdn.ping(function (err, res) {
          should.not.exist(err);
          res.should.be.true;
          done();
        });
      });
    });

    describe("when error", function () {
      it("should return an error when there is an http error", function (done) {
        nock(server)
          .post('/')
          .reply(400, {error: "ERROR"});

        cdn.ping(function (err, res) {
          should.not.exist(res);

          err.should.eql({statusCode: 400, body: {error: "ERROR"}});
          done();
        });
      });

      it("should return an error", function (done) {
        var res = {
            "error": {
                "code": -32601,
                "data": null,
                "message": "Method not found"
            },
            "id": null
        };

        nock(server)
          .post('/')
          .reply(200, res);

        cdn.ping(function (err, res) {
          should.not.exist(res);
          err.should.eql({
            "code": -32601,
            "data": null,
            "message": "Method not found"
          });
          done();
        });
      });
    });
  });
});
