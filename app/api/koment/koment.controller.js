const Q = require('q');

const redis = require('../../../redis.js');

// POST /api/videos/:videoId/koments
// {
//   video: "...",
//   user: { nickname: ..., provider: "afrostream.tv", id: ..., token: "4242" },
//   timecode: float,
//   message: "text"
// }
module.exports.create = function (req, res) {
  const key = 'koment:video:'+req.body.video;
  const koment = {
    user: req.body.user,
    timecode: req.body.timecode,
    message: req.body.message
  };
  Q()
   .then(function () {
     return JSON.stringify(koment);
   }).then(function (json) {
     console.log('[INFO]: [REDIS]: lpush ' + key + ' ' + json);
     return Q.ninvoke(redis, 'lpush', key, json);
   }).then(function () {
     return Q.ninvoke(redis, 'ltrim', key, 0, 99);
   }).then(
     function success() { res.json({}); },
     res.handleError());
};

module.exports.index = function (req, res) {
  const key = 'koment:video:'+req.query.video;
  Q.ninvoke(redis, 'lrange', key, 0, -1)
   .then(
   function success(data) {
     res.json(data.map(function (komment) {
       var k = JSON.parse(komment);
       return {
         user: {
           nickname: k.user.nickname
         },
         timecode: k.timecode,
         message: k.message
       };
     }));
   },
   res.handleError()
  );
};
