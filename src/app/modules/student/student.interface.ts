import { Types } from "mongoose";

// student.interface.ts
export interface UserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName?: string;
  motherOccupation?: string;
  motherContactNo?: string;
}

export interface LocalGuardian {
  name?: string;
  occupation?: string;
  contactNo?: string;
  address?: string;
}

export interface Student {
  id: string;
  user: Types.ObjectId;
  name: UserName;
  gender: "male" | "female" | "others";
  dateOfBarth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  semester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImage?: string;
}
