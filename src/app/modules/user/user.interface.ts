import { Model } from "mongoose";
export type User = {
  id: string;
  password: string;
  needPasswordChange: Boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: Boolean;
};

export interface passwordModel extends Model<User> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<User>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
