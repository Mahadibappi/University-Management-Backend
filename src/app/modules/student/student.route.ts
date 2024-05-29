import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();
router.get("/", StudentController.getAllStudents);
router.get("/:semesterId", StudentController.getSingleStudent);
router.delete("/:semesterId", StudentController.deleteStudent);
export const StudentRoute = router;
