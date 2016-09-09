var Q = require('q');
var redis = require('../redis.js');
var request = require('supertest');
var app = require('../app');
var assert = require('better-assert');

function clearRedisKeys() {
  return Q.ninvoke(redis, 'keys', 'koment:video:test:*')
   .then(function (result) {
     if (result.length) {
       return Q.npost(redis, 'del', result);
     }
   });
}

describe('API: read, create comments', function () {
  before(clearRedisKeys);
  after(clearRedisKeys);

  var randomToken = "randomToken"+Math.random();
  var randomNickname = 'nickname-'+Math.random();
  var randomId = String(Math.round(Math.random() * 1000000));
  var randomVideo = 'test://randomVideo/'+Date.now()+'/'+Math.random();
  var randomTimecode = Math.round(Math.random() * 1000);
  var randomMessage = "random message " + Math.random();
  var randomAvatar = 'http://google.fr/';
  var randomUser = {
    nickname: randomNickname,
    avatar: randomAvatar,
    provider: 'test',
    id: randomId,
    token: randomToken
  };
  console.log('randomVideo = ' + randomVideo);

  describe('GET /api/koments?video=(...): list comment of a random unknown video', function() {
    it('should return 200ok with no comment', function (done) {
      request(app)
        .get('/api/koments')
        .query({video: randomVideo})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
  });

  /*
  video: Joi.string().max(255).min(3).required(),
  user: Joi.object().keys({
    nickname: Joi.string().min(1).max(32).required(),
    provider: Joi.string().max(64),
    id: Joi.string().max(64),
    token: Joi.string().max(64)
  }),
  timecode: Joi.number().required(),
  message: Joi.string().max(140).min(1).required()
  */
  describe('POST /api/koments', function() {
    it('should create a comment and respond 200ok', function (done) {
      request(app)
        .post('/api/koments')
        .send({
          video: randomVideo,
          user: randomUser,
          timecode: randomTimecode,
          message: randomMessage
        })
        .expect(200)
        .end(done);
    });

    it('the list should contain 1 komment', function (done) {
      request(app)
        .get('/api/koments')
        .query({video: randomVideo})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          console.log(res.body);
          assert(Array.isArray(res.body));
          assert(res.body.length === 1);
          assert(res.body[0].user);
          assert(res.body[0].user.nickname === randomNickname);
          assert(res.body[0].user.avatar === randomAvatar);
          assert(typeof res.body[0].user.provider === "undefined");
          assert(typeof res.body[0].user.id === "undefined");
          assert(typeof res.body[0].user.token === "undefined");
          assert(res.body[0].timecode === randomTimecode);
          assert(res.body[0].message === randomMessage);
          done();
        });
    });
  });

  describe('POST /api/koments', function() {
    it('should create a comment and respond 200ok', function (done) {
      request(app)
        .post('/api/koments')
        .send({
          video: randomVideo,
          user: randomUser,
          timecode: randomTimecode,
          message: randomMessage+"2"
        })
        .expect(200)
        .end(done);
    });

    it('the list should contain 2 komment', function (done) {
      request(app)
        .get('/api/koments')
        .query({video: randomVideo})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          assert(Array.isArray(res.body));
          assert(res.body.length === 2);
          assert(res.body[0].user);
          assert(res.body[0].user.nickname === randomNickname);
          assert(typeof res.body[0].user.provider === "undefined");
          assert(typeof res.body[0].user.id === "undefined");
          assert(typeof res.body[0].user.token === "undefined");
          assert(res.body[0].timecode === randomTimecode);
          assert(res.body[0].message === randomMessage+"2");
          done();
        });
    });
  });
});
