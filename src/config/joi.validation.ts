import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
  PORT: Joi.number().default(3000),
  MONGODB: Joi.required(),
  DEFAULT_LIMIT: Joi.number().default(5),
});

