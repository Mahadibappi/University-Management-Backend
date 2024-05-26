import { studentModel } from "./student.model";

const getAllStudentsFromDb = async () => {
  const result = await studentModel.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await studentModel.aggregate([{ $match: { id } }]);
  return result;
};
const deleteStudent = async (id: string) => {
  const result = await studentModel.updateOne({ id }, { isDeleted: true });
  return result;
};
export const studentService = {
  getAllStudentsFromDb,
  getSingleStudent,
  deleteStudent,
};
