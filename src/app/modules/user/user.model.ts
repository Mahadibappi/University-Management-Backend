import { User } from "./user.interface";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<User>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean },
    role: { type: String, enum: ["student", "faculty", "admin"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.hash_pass));
  next();
});

// set empty " after saving password"
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
export const userModel = model<User>("User", userSchema);
