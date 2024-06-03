import { Schema, model } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
    trim: true,
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, "Last Name is Required"] },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User is required"],
    unique: true,
    ref: "User",
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not valid gender",
    },
    required: true,
  },
  dateOfBarth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: { type: String, required: [true, "Contact Must Needed"] },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is needed"],
  },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
  semester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Semester",
  },
});
export const studentModel = model<Student>("Student", studentSchema);
