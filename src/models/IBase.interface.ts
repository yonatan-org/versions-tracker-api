import mongoose, { Document } from "mongoose";
export interface IBaseModel extends Document {
  id: mongoose.Schema.Types.ObjectId;
}
