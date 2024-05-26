import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();
router.get("/", StudentController.getAllStudents);
router.get("/:semesterIdId", StudentController.getSingleStudent);
router.delete("/:semesterIdId", StudentController.deleteStudent);
export const StudentRoute = router;
