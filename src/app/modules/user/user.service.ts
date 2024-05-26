import config from "../../config";
import { Student } from "../student/student.interface";
import { studentModel } from "../student/student.model";
import { User } from "./user.interface";
import { userModel } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: Student) => {
  //CREATE USER
  const userData: Partial<User> = {};
  // if password is not given use default password
  userData.password = password || (config.df_pass as string);
  //student role
  userData.role = "student";
  // set manually generated id
  userData.id = "20302586";
  const newUser = await userModel.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await studentModel.create(studentData);
    return newStudent;
  }
};

export const userService = { createStudentIntoDB };
