import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
  SALT_ROUNDS: Joi.number().default(10),
  JWT_SECRET: Joi.string().required(),
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  HTTPS_ENABLED: Joi.boolean()
    .required()
    .description("Choose to use HTTPS or not"),
  MONGO_URL_DEV: Joi.string()
    .required()
    .description("Mongo DB host url"),
  MONGO_URL_PROD: Joi.string()
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
      ? envVars.MONGO_URL_PROD
      : envVars.MONGO_URL_DEV,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  https: envVars.HTTPS_ENABLED,
  saltRounds: envVars.SALT_ROUNDS,
  jwtSecret: envVars.JWT_SECRET
};

export default config;
