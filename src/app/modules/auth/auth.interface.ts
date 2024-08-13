/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';
import { UserRole } from '../../../constants';



export type IUser = {
  _id?: mongoose.Types.ObjectId;
  user_id?:string;
  name: string;
  email: string;
  profileImageUrl?: string;
  password:string;
  phone_number: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};


export type ILogInUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
  email: string;
};

// export type UserModel = {
//   isUserExist(
//     email: string
//   ): Promise<Pick<IUser, '_id' | 'password' | 'email' | 'role'>>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// } & Model<IUser>;
