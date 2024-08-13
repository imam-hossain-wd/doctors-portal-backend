/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser } from './auth.interface';
import { UserRole } from '../../../constants';




const userSchema = new Schema<IUser>(
  {
    user_id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImageUrl: { type: String},
    password: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Patient },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
);


//Pre-Save Hook: password hashing

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password') || user.isNew) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  next();
});

//check user exit  Static Method
userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await this.findOne(
    { email },
    { _id: 1, password: 1, role: 1, email: 1 }
  );
};

// check  password match  Static Method

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// export const User = model<IUser, UserModel>('User', userSchema);

export const User = model<IUser>('User', userSchema);
