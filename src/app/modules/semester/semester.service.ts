import { academicSemesterNameCodeMapper } from "./semester.constant";
import { TSemester } from "./semester.interface";
import { semesterModel } from "./semester.model";

const createSemesterIntoDB = async (payload: TSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code");
  }
  const result = await semesterModel.create(payload);
  return result;
};

//get all semesters
const getAllAcademicSemestersFromDB = async () => {
  const result = await semesterModel.find();
  return result;
};
// single semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await semesterModel.findById(id);
  return result;
};
// update semester
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await semesterModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const semesterService = {
  createSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
