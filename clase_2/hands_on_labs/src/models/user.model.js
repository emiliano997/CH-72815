import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  age: { type: Number, require: true },
  password: { type: String, require: true },
});

export const userModel = model("user", userSchema);
