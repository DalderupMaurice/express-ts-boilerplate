import { Document, Model } from "mongoose";

// Interface for model itself
export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  identification: string;
  affiliation: string;
  createdAt: Date;
}

export interface IUserMethods extends IUser {
  // Interface for methods (applied to Document)
}

// Interface for instances (applied to Model)
export interface IUserModel extends Model<IUserMethods> {
  getByUsername(userName: string): Promise<IUser>;
  get(id: string): Promise<IUser>;
}
