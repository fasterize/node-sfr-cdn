var should = require('should'),
    CDN = require('../lib/cdn');

describe('CDN test without sending the request', function() {
  var cdn;
  beforeEach(function() {
    cdn = new CDN('login', 'key', 'http://api.cdn/', true);
  });

  describe('#ping', function() {
    it ("should do a post request to the api", function (done) {
      cdn.ping(function (reqObj, date) {
        reqObj.should.eql({
          url: 'http://api.cdn/',
          method: 'POST',
          auth: { user: 'login', pass: 'key' },
          json: {
            jsonrpc: '2.0',
            method: 'ping',
            params: [ 'pong' ],
            id: 'ping ' + date
          }
        });
        done();
      });
    });
  });

  describe('#purgeByRegex', function() {
    it("should do a post request to the api", function (done) {
      cdn.purgeByRegex('zoneId', '.*', function (reqObj, date) {
        reqObj.should.eql({
          url: 'http://api.cdn/zone/',
          method: 'POST',
          auth: { user: 'login', pass: 'key' },
          json: {
            jsonrpc: '2.0',
            method: 'purgeByRegex',
            params: { name: 'zoneId', regex: '.*' },
            id: 'purgeByRegex ' + date
          }
        });
        done();
      });
    });
  });

  describe('#purgeByURL', function() {
    it("should do a post request to the api", function (done) {
      cdn.purgeByURL('http://url.com/path', function (reqObj, date) {
        reqObj.should.eql({
          url: 'http://api.cdn/zone/',
          method: 'POST',
          auth: { user: 'login', pass: 'key' },
          json: {
            jsonrpc: '2.0',
            method: 'purgeByURL',
            params: { url: 'http://url.com/path' },
            id: 'purgeByURL ' + date
          }
        });
        done();
      });
    });
  });

  describe('#prefetchByUrl', function () {
    it("should do a post request to the api", function (done) {
      cdn.prefetchByUrl('http://url.com/path', function (reqObj, date) {
        reqObj.should.eql({
          url: 'http://api.cdn/zone/',
          method: 'POST',
          auth: { user: 'login', pass: 'key' },
          json: {
            jsonrpc: '2.0',
            method: 'prefetchByUrl',
            params: { url: 'http://url.com/path' },
            id: 'prefetchByUrl ' + date
          }
        });
        done();
      });
    });
  });
});
