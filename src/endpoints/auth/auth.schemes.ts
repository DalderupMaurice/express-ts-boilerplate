import { checkSchema } from "express-validator/check";

// POST /auth/login
export const loginScheme = checkSchema({
  username: {
    in: "body",
    exists: true,
    errorMessage: "No username was given"
  },
  password: {
    in: "body",
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      // Multiple options would be expressed as an array
      options: { min: 3 }
    }
  }
});

export const registerScheme = checkSchema({
  username: {
    in: "body",
    errorMessage: "No username was given",
    exists: true
  },
  password: {
    in: "body",
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      // Multiple options would be expressed as an array
      options: { min: 3 }
    }
  }
});
