import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();
router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getSingleStudent);
router.delete("/:studentId", StudentController.deleteStudent);
router.patch("/:studentId", StudentController.updateStudent);
export const StudentRoute = router;
