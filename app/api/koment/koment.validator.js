const Q = require('q');
const Joi = require('joi');

const schemaCreateBody = Joi.object().keys({
  video: Joi.string().max(255).min(3).required(),
  user: Joi.object().keys({
    nickname: Joi.string().min(1).max(32),
    avatar: Joi.string().max(256),
    provider: Joi.string().max(64),
    id: Joi.string().max(64),
    token: Joi.string().max(64)
  }),
  timecode: Joi.number().required(),
  message: Joi.string().max(140).min(1).required()
});

module.exports.validateCreateBody = function () {
  return function (req, res, next) {
    Q.ninvoke(Joi, 'validate', req.body, schemaCreateBody)
    .then(
      function () { next(); }
    , res.handleError()
    );
  };
};
