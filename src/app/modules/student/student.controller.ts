import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import globalErrorHandler from "../../middlewares/globalErrorHandler";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentService.getAllStudentsFromDb();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(globalErrorHandler);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await studentService.getSingleStudent(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(globalErrorHandler);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.deleteStudent(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error: any) {
    next(globalErrorHandler);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
