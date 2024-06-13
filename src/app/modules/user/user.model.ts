import { User, passwordModel } from "./user.interface";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<User>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean },
    role: { type: String, enum: ["student", "faculty", "admin"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    passwordChangedAt: {
      type: Date,
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
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await userModel.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const userModel = model<User, passwordModel>("User", userSchema);
