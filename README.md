node-sfr-cdn
============

API of the SFR CDN

##Usage with the binary

```
sfr-cdn -l login -k key ping

sfr-cdn -l login -k key purgeByRegex zone regex

sfr-cdn -l login -k key purgeByURL url

sfr-cdn -l login -k key prefetchByUrl url
```

##Usage with node
```js
var CDN = require('sfr-cdn');

var cdn = new CDN(login, key);

cdn.ping(callback);

cdn.purgeByRegex(zone, regex, callback);

cdn.purgeByURL(url, callback);

cdn.prefetchByUrl(url, callback);
```

