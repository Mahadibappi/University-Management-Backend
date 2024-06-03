import config from "../../config";
import { semesterModel } from "../semester/semester.model";
import { Student } from "../student/student.interface";
import { studentModel } from "../student/student.model";
import { User } from "./user.interface";
import { userModel } from "./user.model";
import { generateStudentId } from "./user.utils";

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

  userData.id = await generateStudentId(semester);
  const newUser = await userModel.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await studentModel.create(payload);
    return newStudent;
  }
};

export const userService = { createStudentIntoDB };
