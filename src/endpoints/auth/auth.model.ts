import httpStatus from "http-status";
import { model, Schema } from "mongoose";

import { User, UserModel } from "../../types/User";
import APIError from "../../utils/APIError";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  identification: {
    type: String,
    required: true
  },
  affiliation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Methods - these exist on the instance
 */
UserSchema.method({});

/**
 * Statics - these exist on the model
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id: string) {
    return this.findById(id)
      .exec()
      .then((user: User) => {
        if (user) {
          return user;
        }
        const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get user
   * @param {ObjectId} username - The username of user.
   * @returns {Promise<User, APIError>}
   */
  getByUsername(username: string) {
    return this.findOne({ username })
      .exec()
      .then((user: User) => {
        if (user) {
          return user;
        }
        const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

export default model<User, UserModel>("User", UserSchema);
