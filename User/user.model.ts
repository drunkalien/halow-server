import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  bio?: string;
  profilePic?: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  profilePic: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next: any) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
  } else {
    next();
  }
});

export default model("User", UserSchema);
