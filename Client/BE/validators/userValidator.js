const { Joi, Segments, celebrator, errors } = require("celebrate");

const postLoginUserValidator = celebrator({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().not().empty().email().required(),
    password: Joi.string().not().empty().required(),
    otp_code: Joi.string().not().empty().length(6).required(),
  }),
});

const postSignupUserValidator = celebrator({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().not().empty().required(),
    lastName: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().email().required(),
    phone: Joi.string().not().empty().length(10).required(),
    googleMapAddress: Joi.string().not().empty().required(),
    address: Joi.string().not().empty().required(),
    profilePicturePath: Joi.string().not().empty().required(),
  }),
});

const postAuthUserValidator = celebrator({
  [Segments.HEADERS]: Joi.object().keys({
    token: Joi.string().not().empty().required(),
  }),
});

const putUserValidator = celebrator({
  [Segments.HEADERS]: Joi.object().keys({
    token: Joi.string().not().empty(),
  }),
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().not().empty().optional(),
    lastName: Joi.string().not().empty().optional(),
    password: Joi.string().not().empty().optional(),
    email: Joi.string().not().empty().email().optional(),
    phone: Joi.string().not().empty().length(10).optional(),
    googleMapAddress: Joi.string().not().empty().optional(),
    address: Joi.string().not().empty().optional(),
    profilePicturePath: Joi.string().not().empty().optional(),
  }),
});

const postLogoutUserValidator = celebrator({
  [Segments.HEADERS]: Joi.object().keys({
    token: Joi.string().not().empty().required(),
  }),
});

module.exports = {
  postAuthUserValidator,
  postLoginUserValidator,
  postLogoutUserValidator,
  postSignupUserValidator,
  putUserValidator,
};
