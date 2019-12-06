import { checkSchema } from "express-validator";

// POST /auth/login
export const loginScheme = checkSchema({
  username: {
    in: "body",
    exists: true,
    errorMessage: "username is required"
  },
  password: {
    in: "body",
    isLength: {
      errorMessage: "Password should be at least 3 chars long",
      options: { min: 3 }
    }
  }
});

export const registerScheme = checkSchema({
  username: {
    in: "body",
    exists: true,
    errorMessage: "username is required",
    isLength: {
      errorMessage: "username should be at least 3 chars long",
      options: { min: 3 }
    }
  },
  password: {
    in: "body",
    exists: true,
    errorMessage: "password is required",
    isLength: {
      errorMessage: "password should be at least 3 chars long",
      options: { min: 3 }
    }
  },
  role: { in: "body", exists: true, errorMessage: "role is required" }
});
