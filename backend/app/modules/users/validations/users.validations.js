const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.logOutValidation = (data, callback) => {
	return Joi.validate({refreshToken: Joi.string().required()}, callback)
};