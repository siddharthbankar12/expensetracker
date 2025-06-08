import { model, Schema } from "mongoose";

const userSchema = new Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("Users", userSchema);

export default User;
