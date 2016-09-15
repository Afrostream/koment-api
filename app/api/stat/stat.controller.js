const Q = require('q');

const redis = require('../../../redis.js');

module.exports.index = function (req, res) {
  const result = {
    total: null,
    videos: {
      /*id: {
         count : ...,
         koments: ...
      } */
    }
  };
  Q.ninvoke(redis, 'keys', '*')
  .then(function (keys) {
    return Q.all(keys.map(function (k) {
      return Q.ninvoke(redis, 'lrange', k, 0, -1);
    })).then(
      function (data) {
        var total = 0;
        data.forEach(function (koments, i) {
          var videoId = keys[i];
          var videoStats = {
            count: koments.length,
            koments: koments
          };
          result.videos[videoId] = videoStats;
          total += koments.length;
        });
        result.total = total;
      }
    );
  })
  .then(
    function () { res.json(result); },
    res.handleError()
  );
};
