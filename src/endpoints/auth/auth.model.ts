import { model, Schema } from "mongoose";

import UserNotFoundError from "../../utils/UserNotFoundError";
import { User, UserModel } from "../../types/User";

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
   * @returns {Promise<User, UserNotFoundError>}
   */
  get(id: string) {
    return this.findById(id)
      .exec()
      .then((user: User) => {
        if (user) {
          return user;
        }
        const err = new UserNotFoundError(`User with ID ${id} not found.`);
        return Promise.reject(err);
      });
  },

  /**
   * Get user
   * @param {ObjectId} username - The username of user.
   * @returns {Promise<User, UserNotFoundError>}
   */
  getByUsername(username: string) {
    return this.findOne({ username })
      .exec()
      .then((user: User) => {
        if (user) {
          return user;
        }
        const err = new UserNotFoundError(
          `User with name ${username} not found.`
        );
        return Promise.reject(err);
      });
  }
};

export default model<User, UserModel>("User", UserSchema);
