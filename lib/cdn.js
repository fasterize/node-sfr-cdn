var request = require('request');

/**
 * Constructor
 * @param {string} login email address of an account declared into the account.
 * @param {string} key   access key provided by the SFR contact
 * @param {string} url   (optional) url of the API
 * @param {boolean} dryRun (optional) set to true to avoid the HTTP request
 */
function CDN(login, key, url, dryRun) {
  this.url = url || "https://extranet-cdn.sfrbusinessteam.fr/api/";
  this.login = login;
  this.key = key;
  this.dryRun = dryRun === undefined ? false : dryRun;
}

CDN.prototype.ping = function ping(callback) {
  this.request(this.url, 'ping', ['pong'], callback);
};

CDN.prototype.purgeByRegex = function purgeByRegex(zone, regex, callback) {
  var params = {
    name: zone,
    regex: regex
  };

  this.request(this.url + 'zone/', 'purgeByRegex', params, callback);
};

CDN.prototype.purgeByURL = function purgeByURL(url, callback) {
  var params = {
    url: url
  };

  this.request(this.url + 'zone/', 'purgeByURL', params, callback);
};

CDN.prototype.prefetchByUrl = function prefetchByUrl(url, callback) {
  var params = {
    url: url
  };

  this.request(this.url + 'zone/', 'prefetchByUrl', params, callback);
};


CDN.prototype.request = function (url, method, data, callback) {
  var date = Date.now();

  var reqOptions = {
    url: url,
    method: "POST",
    auth: {
      user: this.login,
      pass: this.key
    },
    json: {
      jsonrpc: '2.0',
      method: method,
      params: data,
      id: method + ' ' + date
    }
  };

  if (this.dryRun) {
    return callback(reqOptions, date);
  }
  else {
    request(reqOptions, function onResult(error, response, body) {
      if (error) {
        callback(error);
      }
      else if (response.statusCode !== 200) {
        callback({statusCode: response.statusCode, body: body});
      }
      else if (body.error) {
        callback(body.error);
      }
      else {
        callback(null, body.result);
      }
    });
  }
};

module.exports = CDN;
