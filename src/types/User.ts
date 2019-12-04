import { Document, Model } from "mongoose";

// Interface for model itself
export interface User extends Document {
  username: string;
  password: string;
  role: string;
  identification: string;
  affiliation: string;
  createdAt: Date;
}

export type UserMethods = User;

// Interface for instances (applied to Model)
export interface UserModel extends Model<UserMethods> {
  getByUsername(userName: string): Promise<User>;
  get(id: string): Promise<User>;
}
