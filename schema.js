const Joi = require("joi");

const imageSchema = Joi.object({
  url: Joi.string().uri().trim().required(),
});

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    price: Joi.number().min(0).required(),
    country: Joi.string().trim().optional(),
    image: imageSchema.required(),
  }).required(),
});

module.exports.validateListing = (data) =>
  module.exports.listingSchema.validate(data, {abortEarly: false});
