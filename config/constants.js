import * as joi from "joi";

import * as dotenv from "dotenv";
dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  MONGO_URI: Joi.string()
    .required()
    .description("Mongo DB host url"),
  MONGO_URI_PROD: Joi.string()
    .required()
    .description("Mongo DB host url for production environment")
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(
    `Check your '.env' file (located at the root of this project),
      validation error: ${error.message}`
  );
}

const config = {
  mongoUri:
    envVars.NODE_ENV === "production"
      ? envVars.MONGO_URI_PROD
      : envVars.MONGO_URI,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG
};

export default config;
