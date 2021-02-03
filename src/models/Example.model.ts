import mongoose, { Schema } from "mongoose";

import { IBaseModel } from "./IBase.interface";

export interface IExample extends IBaseModel {
  name: string;
  email: string;
  passwordHash: string;
  status: string;
};

const ExampleSchema: Schema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
}, {
  timestamps: true,
});

export default mongoose.model<IExample>("Example", ExampleSchema);