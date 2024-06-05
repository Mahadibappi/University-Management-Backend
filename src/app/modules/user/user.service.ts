import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { semesterModel } from "../semester/semester.model";
import { Student } from "../student/student.interface";
import { studentModel } from "../student/student.model";
import { User } from "./user.interface";
import { userModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: Student) => {
  //CREATE USER
  const userData: Partial<User> = {};

  // if password is not given use default password
  userData.password = password || (config.df_pass as string);
  //student role
  userData.role = "student";

  // generated id creation
  // find semester info for year and code
  const semester: any = await semesterModel.findById(payload.semester);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(semester);

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await studentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create student");
  }
};

export const userService = { createStudentIntoDB };
