import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User = models.User || mongoose.model("User", UserSchema);
