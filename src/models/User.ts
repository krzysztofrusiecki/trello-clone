import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 7,
      max: 255,
    },
    lastname: {
      type: String,
      required: true,
      min: 7,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 7,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 7,
      max: 255,
    },
  },
  {
    versionKey: false,
  },
);

export default model<IUser>('User', userSchema);
